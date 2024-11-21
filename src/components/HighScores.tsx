import { formatTime } from '@/lib/utils';

interface HighScore {
  name: string;
  time: number;
  word: string;
  date: string;
}

interface HighScoresProps {
  scores: HighScore[];
}

export function HighScores({ scores }: HighScoresProps) {
  return (
    <div className="mt-8 p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-[#38F8AC]">Top 5 Scores</h2>
      <div className="space-y-4">
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-800 rounded transition-colors hover:bg-gray-700"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#38F8AC]">#{index + 1}</span>
              <div>
                <p className="font-medium">{score.name}</p>
                <p className="text-sm text-gray-400">{score.word}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-[#38F8AC]">{formatTime(score.time)}</p>
              <p className="text-sm text-gray-400">{score.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}