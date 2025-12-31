import type { SuggestedQuestion } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onSelect: (text: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  const { theme } = useTheme();
  const isDark = theme.isDark;

  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-lg">
      {questions.map((question, index) => (
        <button
          key={question.id}
          onClick={() => onSelect(question.text)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] transition-all hover:scale-105 hover:shadow-md"
          style={{
            backgroundColor: isDark ? 'var(--neutral-800)' : '#FFFFFF',
            color: isDark ? '#FFFFFF' : 'var(--neutral-900)',
            border: `1px solid ${isDark ? 'var(--neutral-700)' : 'var(--neutral-200)'}`,
            animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
          }}
        >
          <span style={{ color: 'var(--primary)' }}>✦</span>
          <span>{question.text}</span>
          <ArrowRight
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            style={{ color: 'var(--neutral-500)' }}
          />
        </button>
      ))}
    </div>
  );
}
