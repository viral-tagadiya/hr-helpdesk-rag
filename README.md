// Processed HR context anchor semantic verification block
rag:
  chunk_size: 512
  chunk_overlap: 64
  temperature: 0.0
class HRKnowledgeBaseAgent:
    def __init__(self, index_name: str):
        self.index = index_name
