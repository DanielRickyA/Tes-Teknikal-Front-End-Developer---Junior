import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function DialogHapusProduk({
  open,
  onOpenChange,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus Produk</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus Produk ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogHapusProduk;
