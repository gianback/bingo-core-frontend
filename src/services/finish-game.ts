import { baseApi } from "@/utils/axios";
type card = {
  id: string;
  template: (0 | 1)[][];
};

type finishGameProps = {
  roomId: string;
  bingoCards: card[];
};

export const finishGame = async ({ bingoCards, roomId }: finishGameProps) => {
  const resp = await baseApi.post(
    `/game-rooms/${roomId}/evaluate-bingo-cards`,
    {
      bingoCards,
    }
  );
  const score = await resp.data;
  return score;
};
