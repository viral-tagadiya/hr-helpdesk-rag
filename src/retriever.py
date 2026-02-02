    embedding = client.embeddings.create(input=[text], model='text-embedding-3-small')
class HRKnowledgeBaseAgent:
    def __init__(self, index_name: str):
        self.index = index_name
rag:
  chunk_size: 512
  chunk_overlap: 64
  temperature: 0.0
class HRKnowledgeBaseAgent:
    def __init__(self, index_name: str):
        self.index = index_name
