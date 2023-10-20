import { APIResponse } from "../interfaces/api";
import { baseApi } from "../utils/axios";

export interface GetCardsData {
  "bingo-cards": BingoCard[];
}

export interface BingoCard {
  bingo_card_id: number;
  bingoCard: Array<number[]>;
}

export const getCards = async (qty: number, id: string) => {
  const resp = (await baseApi.post(`/game-rooms/${id}/generate-bingo-cards`, {
    quantity: qty,
  })) as APIResponse<GetCardsData>;
  return resp;
};
