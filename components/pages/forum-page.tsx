import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Plus } from "lucide-react";

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
}

interface ForumPageProps {
  topics: ForumTopic[];
}

export function ForumPage({ topics }: ForumPageProps) {
  return (
    <div className="space-bg min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Fórum da <span className="text-gradient">Comunidade</span>
          </h1>
          <Button className="btn-primary group">
            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
            Novo Tópico
          </Button>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <Card key={topic.id} className="forum-topic group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {topic.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span>Por {topic.author}</span>
                      <span>•</span>
                      <span>{topic.replies} respostas</span>
                      <span>•</span>
                      <span>{topic.lastActivity}</span>
                    </div>
                  </div>
                  <MessageCircle className="h-5 w-5 text-white/40 group-hover:text-blue-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
