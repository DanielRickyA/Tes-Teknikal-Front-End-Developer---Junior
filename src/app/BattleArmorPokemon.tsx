import { effectEntriesProps, getBattleArmor } from "@/api/apiPokemon";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function BattleArmorPokemon() {
  const navigate = useNavigate();
  const [data, setData] = useState<effectEntriesProps[]>();

  const fetchData = async () => {
    try {
      const response = await getBattleArmor();
      console.log(response.effect_entries[0].effect);
      setData(response.effect_entries ?? []);
    } catch (error) {
      toast.error("Gagal memuat data");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div
        className="flex justify-start items-center gap-2"
        onClick={() => {
          navigate("/");
        }}
      >
        <CircleArrowLeft size={16} /> Kembali
      </div>
      <p className="text-3xl text-left font-semibold mt-2">
        Battle Armor Pokemon
      </p>
      <p className="mt-4">Effect Battle Armor</p>
      <ul className="list-disc pl-4 space-y-2 mt-4">
        <li> Effect: {data ? data[0].effect : ""}</li>
        <li> Effect: {data ? data[1].effect : ""} </li>
      </ul>
    </div>
  );
}

export default BattleArmorPokemon;
