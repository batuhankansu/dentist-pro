"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email?: string;
  phone?: string;
  bio?: string;
  isActive: boolean;
}

const emptyDoctor: Omit<Doctor, "id"> = {
  name: "",
  specialty: "",
  email: "",
  phone: "",
  bio: "",
  isActive: true,
};

export default function AdminDoktorlarPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState(emptyDoctor);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then(setDoctors)
      .catch(() => {
        setDoctors([
          {
            id: "1",
            name: "Dr. Ahmet Kansu",
            specialty: "Genel Diş Hekimliği",
            email: "ahmet@kansudis.com",
            phone: "0500 111 22 33",
            bio: "15 yıllık deneyim ile genel diş hekimliği ve implant tedavileri.",
            isActive: true,
          },
          {
            id: "2",
            name: "Dr. Ayşe Yılmaz",
            specialty: "Ortodonti",
            email: "ayse@kansudis.com",
            phone: "0500 222 33 44",
            bio: "Ortodontik tedaviler ve diş telleri konusunda uzman.",
            isActive: true,
          },
          {
            id: "3",
            name: "Dr. Mehmet Demir",
            specialty: "Endodonti",
            email: "mehmet@kansudis.com",
            phone: "0500 333 44 55",
            bio: "Kanal tedavisi ve diş pulp hastalıkları uzmanı.",
            isActive: true,
          },
        ]);
      });
  };

  const openAddDialog = () => {
    setEditingDoctor(null);
    setFormData(emptyDoctor);
    setDialogOpen(true);
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      email: doctor.email || "",
      phone: doctor.phone || "",
      bio: doctor.bio || "",
      isActive: doctor.isActive,
    });
    setDialogOpen(true);
  };

  const saveDoctor = () => {
    if (editingDoctor) {
      // Update
      setDoctors((prev) =>
        prev.map((d) =>
          d.id === editingDoctor.id ? { ...d, ...formData } : d
        )
      );
      toast.success("Doktor güncellendi");
    } else {
      // Add
      const newDoctor: Doctor = {
        id: `doc-${Date.now()}`,
        ...formData,
      };
      setDoctors((prev) => [...prev, newDoctor]);
      toast.success("Doktor eklendi");
    }
    setDialogOpen(false);
  };

  const deleteDoctor = (id: string) => {
    if (confirm("Bu doktoru silmek istediğinize emin misiniz?")) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
      toast.success("Doktor silindi");
    }
  };

  const toggleActive = (id: string) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doktorlar</h1>
          <p className="text-slate-600">Doktorları yönetin</p>
        </div>
        <Button onClick={openAddDialog} className="bg-sky-500 hover:bg-sky-600">
          <Plus className="mr-2 h-4 w-4" />
          Doktor Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            className={!doctor.isActive ? "opacity-60" : ""}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                    {doctor.name.split(" ").slice(-1)[0].charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-sky-600">{doctor.specialty}</p>
                  </div>
                </div>
              </div>
              {doctor.bio && (
                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  {doctor.bio}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(doctor)}
                >
                  <Edit className="mr-1 h-4 w-4" />
                  Düzenle
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleActive(doctor.id)}
                >
                  {doctor.isActive ? "Pasif Yap" : "Aktif Yap"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => deleteDoctor(doctor.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingDoctor ? "Doktor Düzenle" : "Yeni Doktor Ekle"}
            </DialogTitle>
            <DialogDescription>
              Doktor bilgilerini doldurun
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ad Soyad *</Label>
              <Input
                placeholder="Dr. ..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Uzmanlık *</Label>
              <Input
                placeholder="Örn: Orodonti"
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>E-posta</Label>
              <Input
                type="email"
                placeholder="doktor@ornek.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                placeholder="05XX XXX XX XX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Biyografi</Label>
              <Textarea
                placeholder="Doktor hakkında kısa bilgi..."
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              <X className="mr-1 h-4 w-4" />
              İptal
            </Button>
            <Button
              onClick={saveDoctor}
              disabled={!formData.name || !formData.specialty}
              className="bg-sky-500 hover:bg-sky-600"
            >
              <Save className="mr-1 h-4 w-4" />
              {editingDoctor ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
