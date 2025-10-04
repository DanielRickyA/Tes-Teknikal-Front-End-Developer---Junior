import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProdukProps } from "@/lib/model";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function AddUpdateProduk() {
  const navigate = useNavigate();
  const { id } = useParams();
  const idIndex = Number(id);
  const [title, setTitle] = useState<string>("Tambah");
  const [list, setList] = useState<ProdukProps[]>([]);
  const [formData, setFormData] = useState<ProdukProps>({
    nama: "",
    harga: 0,
    stok: 0,
  });

  useEffect(() => {
    const local = localStorage.getItem("ProdukForm");
    let listData;
    if (local) {
      setList(JSON.parse(local) ?? "");
      listData = JSON.parse(local);
    }

    if (id) {
      console.log(listData);
      setTitle("Edit");
      setFormData({
        nama: listData[idIndex].nama,
        harga: listData[idIndex].harga,
        stok: listData[idIndex].stok,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddUpdate = () => {
    if (!formData.nama) {
      return toast.error("Nama Tidak Boleh Kosong");
    } else if (!formData.harga) {
      return toast.error("Harga Tidak Boleh Kosong");
    } else if (!formData.stok) {
      return toast.error("Stok Tidak Boleh Kosong");
    }

    const textSimilar = formData.nama;
    let unique = 0;
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].nama.toLowerCase() == textSimilar.toLowerCase()) {
        unique = 1;
      }
    }

    if (id && list[idIndex].nama.toLowerCase() == textSimilar.toLowerCase()) {
      unique = 0;
    }
    console.log(unique);

    if (!id) {
      // Kondisi Tambah
      if (unique == 1) {
        return toast.error("Nama Harus Unik");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setList((prev: any) => {
          console.log(prev);
          const newData = {
            nama: formData.nama,
            harga: formData.harga,
            stok: formData.stok,
          };
          localStorage.setItem(
            "ProdukForm",
            JSON.stringify([...prev, newData])
          );

          return [...prev, newData];
        });
        navigate("/");
        toast.success("Berhasil Tambah Produk");
      }
    } else {
      // Kondisi Update
      if (unique == 1) {
        return toast.error("Nama Harus Unik");
      } else {
        const datas = list;
        const data = { ...datas[idIndex] };
        data.nama = formData.nama;
        data.harga = formData.harga;
        data.stok = formData.stok;
        datas[idIndex] = data;
        setList(datas);
        console.log(datas);
        localStorage.setItem("ProdukForm", JSON.stringify(datas));
        navigate("/");
        toast.success("Berhasil Ubah Produk");
      }
    }
  };
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
      <p className="text-2xl text-left font-semibold mt-2">{title} Produk</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="nama">Nama Produk</Label>
          <Input
            id="nama"
            type="text"
            placeholder="Masukan Nama Produk"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="harga">Harga Produk</Label>
          <Input
            id="harga"
            type="number"
            min={0}
            placeholder="Masukan Harga Produk"
            value={formData.harga}
            onChange={(e) =>
              setFormData({ ...formData, harga: Number(e.target.value) })
            }
          />
        </div>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="stok">Stok Produk</Label>
          <Input
            id="stok"
            type="number"
            min={0}
            placeholder="Masukan Stok Produk"
            value={formData.stok}
            onChange={(e) =>
              setFormData({ ...formData, stok: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Button className="w-full md:w-auto" onClick={handleAddUpdate}>
          Simpan
        </Button>
      </div>
    </div>
  );
}

export default AddUpdateProduk;
