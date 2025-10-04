import { AxiosError } from "axios";
import useAxios from "..";
import { ApiError, ApiResponse } from "./type";

export async function getAbility(
  offset?: number
): Promise<ApiResponse<AbilityProps[]>> {
  try {
    const response = await useAxios.get(`/ability`, {
      params: { offset, limmit: 10 },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}
export async function getBattleArmor(): Promise<BattleArmorProps> {
  try {
    const response = await useAxios.get(`/ability/battle-armor`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export interface AbilityProps {
  name: string;
}

export interface BattleArmorProps {
  effect_entries: effectEntriesProps[];
}

export interface effectEntriesProps {
  effect: string;
  short_effect: string;
}
