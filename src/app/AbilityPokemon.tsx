import { getAbility, AbilityProps } from "@/api/apiPokemon";
import PaginationTable from "@/components/pagination-table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AbilityPokemon() {
  const navigate = useNavigate();
  const [data, setData] = useState<AbilityProps[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const fetchData = async (offset: number) => {
    setLoading(true);
    try {
      const response = await getAbility(offset);
      setData(response.results ?? []);
      console.log(response.results);
      setTotalData(response.count);
    } catch (error) {
      toast.error("Gagal memuat data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = useMemo(() => {
    if (!data) return;

    const lowerSearch = search.toLocaleLowerCase();

    return data?.filter((item) =>
      item.name.toLocaleLowerCase().includes(lowerSearch)
    );
  }, [data, search]);

  useEffect(() => {
    fetchData(offset);
  }, [offset]);
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
      <p className="text-3xl text-left font-semibold mt-2">Ability Pokemon</p>
      <div className="grid w-full sm:max-w-sm items-center gap-2 mt-8">
        <Label htmlFor="search">Cari Ability Pokemon</Label>
        <Input
          id="search"
          type="search"
          placeholder="Masukan Nama Ability Pokemon untuk mencari"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Card className="mt-6 p-2">
        <CardContent className="p-2">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-full font-semibold">
                  Nama Ability
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <div className="my-6 flex justify-center items-center">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              ) : filterData?.length == 0 ? (
                <div className="my-6 flex justify-center items-center">
                  <p className="text-xl font-semibold">Data Kosong</p>
                </div>
              ) : (
                filterData?.map((item) => (
                  <TableRow>
                    <TableCell className="">{item.name}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <PaginationTable
                    page={offset}
                    total={totalData}
                    onPageChange={setOffset}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AbilityPokemon;
