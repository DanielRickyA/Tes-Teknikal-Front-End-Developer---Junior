import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProdukProps } from "@/lib/model";
import { formatRupiah } from "@/lib/utils";
import { EllipsisVertical, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import DialogHapusProduk from "@/components/dialog-hapus-produk";
import { toast } from "sonner";

function LandingPage() {
  const [list, setList] = useState<ProdukProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [sortir, setSortir] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const local = localStorage.getItem("ProdukForm");
    if (local) setList(JSON.parse(local) ?? "");

    setLoading(false);
  }, []);

  const handleDelete = () => {
    if (!nama) return toast.error("Produk tidak ditemukan");

    const listBaru = list.filter((item) => item.nama != nama);

    setList(listBaru);
    localStorage.setItem("ProdukForm", JSON.stringify(listBaru));
    setOpen(false);
    toast.success("Berhasil Hapus Produk");
  };

  const filterData = useMemo(() => {
    if (!list) return;

    const lowerSearch = search.toLocaleLowerCase();

    return list
      .filter((item) => item.nama.toLocaleLowerCase().includes(lowerSearch))
      .filter(() =>
        sortir == "harga"
          ? list.sort((a, b) => a.harga - b.harga)
          : list.sort((a, b) => a.stok - b.stok)
      );
  }, [list, search, sortir]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-semibold text-4xl">List Produk</p>
        <Button
          className="flex gap-2 items-center w-full sm:w-auto"
          onClick={() => navigate("/produk")}
        >
          <Plus /> Tambah Produk
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <div className="grid w-full sm:max-w-sm items-center gap-2 ">
          <Label htmlFor="search">Cari Produk</Label>
          <Input
            id="search"
            type="search"
            placeholder="Masukan Nama Produk untuk mencari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid w-full sm:max-w-sm items-center gap-2 ">
          <Label htmlFor="search">Sortir Data</Label>
          <Select value={sortir} onValueChange={(e) => setSortir(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Data yang ingin disortir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="harga">Harga</SelectItem>
              <SelectItem value="stok">Stok</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-8">
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : filterData?.length == 0 ? (
          <div className="md:col-span-2 lg:col-span-4 mt-12">
            <p className="text-center text-3xl font-semibold">Data Kosong</p>
            <p className="text-center text-xl">
              Silahkan Tambah Data Produk Terlebih Dahulu
            </p>
          </div>
        ) : (
          filterData?.map((item, index) => (
            <Card className="gap-0 p-0" key={index}>
              <CardHeader className="p-0 relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
                  alt="foto"
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <Badge className="bg-red-500 text-white rounded-full absolute top-2 left-2">
                  On Sale
                </Badge>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate(`/produk/${index}`)}
                      >
                        Ubah
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setOpen(true);
                          setNama(item.nama);
                        }}
                      >
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-6 text-left">
                <p className="text-left">{item.nama}</p>
                <p className="mt-2 text-lg font-semibold">
                  {formatRupiah(item.harga)}
                </p>
                <p className="text-left mt-2">Stock: {item.stok}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="mt-16">
        <p className="text-3xl font-semibold">Pokemon Data</p>
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={() => navigate("/pokemon/ability")}>Ability</Button>
          <Button onClick={() => navigate("/pokemon/battle-armor")}>
            Battle Armor
          </Button>
        </div>
      </div>
      <DialogHapusProduk
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default LandingPage;
