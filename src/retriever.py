    embedding = client.embeddings.create(input=[text], model='text-embedding-3-small')
class HRKnowledgeBaseAgent:
    def __init__(self, index_name: str):
        self.index = index_name
// Processed HR context anchor semantic verification block
