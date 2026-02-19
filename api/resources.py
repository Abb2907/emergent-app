"""GET /api/resources - Fetch resources with optional filtering"""
import json
from api.utils import db

async def handler(request):
    """Handler for GET /api/resources"""
    try:
        # Get query parameters
        type_filter = request.args.get('type', 'all')
        category = request.args.get('category', '')
        level = request.args.get('level', '')
        limit = int(request.args.get('limit', 50))
        skip = int(request.args.get('skip', 0))
        
        # Build query
        query = {}
        if type_filter and type_filter != 'all':
            query['type'] = type_filter
        if category:
            query['category'] = {'$regex': category, '$options': 'i'}
        if level:
            query['level'] = level
        
        # Fetch resources
        resources = await db.resources.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
        total = await db.resources.count_documents(query)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'resources': resources,
                'total': total
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }
