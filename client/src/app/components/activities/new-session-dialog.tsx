// components/activities/new-session-dialog.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import api from "@/lib/api"; // Import the API utility

interface NewSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSessionCreated?: () => void; // Add a callback to notify parent
}

export function NewSessionDialog({ open, onOpenChange, onSessionCreated }: NewSessionDialogProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    farm_size: "",
    district: "",
    crop_type: "",
    veg_variety: "",
    expected_harvest: "",
    seed_source: "",
    seed_quantity: "",
    seed_cost: "",
    soil_type: "",
    soil_ph: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the data to match the backend's expected fields
      const payload = {
        farm_size: parseFloat(formData.farm_size),
        district: formData.district,
        crop_type: formData.crop_type,
        veg_variety: formData.veg_variety,
        expected_harvest: parseFloat(formData.expected_harvest),
        seed_source: formData.seed_source,
        seed_quantity: parseFloat(formData.seed_quantity),
        seed_cost: parseFloat(formData.seed_cost),
        soil_type: formData.soil_type || undefined, // Optional field
        soil_ph: formData.soil_ph ? parseFloat(formData.soil_ph) : undefined, // Optional field
      };

      // Make the API call to create a new session
      const response = await api.post("/sessions", payload);

      // Notify the parent component that a new session was created
      if (onSessionCreated) {
        onSessionCreated();
      }

      // Close the dialog and redirect to the activities page
      onOpenChange(false);
      router.push("/activities");
    } catch (error: any) {
      console.error("Error creating session:", error);
      setError(error.response?.data?.message || "Failed to create session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start New Crop Session</DialogTitle>
          <DialogDescription>Enter the details to start tracking a new crop session</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farm_size">Farm Size (acres)</Label>
              <Input
                id="farm_size"
                name="farm_size"
                type="number"
                value={formData.farm_size}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select onValueChange={(value) => handleSelectChange("district", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent className="bg-green-50">
                  <SelectItem value="Anuradhapura">Anuradhapura</SelectItem>
                  <SelectItem value="Polonnaruwa">Polonnaruwa</SelectItem>
                  <SelectItem value="Kandy">Kandy</SelectItem>
                  <SelectItem value="Kurunegala">Kurunegala</SelectItem>
                  <SelectItem value="Nuwara Eliya">Nuwara Eliya</SelectItem>
                  <SelectItem value="Matale">Matale</SelectItem>
                  <SelectItem value="Badulla">Badulla</SelectItem>
                  <SelectItem value="Ratnapura">Ratnapura</SelectItem>
                  <SelectItem value="Jaffna">Jaffna</SelectItem>
                  <SelectItem value="Trincomalee">Trincomalee</SelectItem>
                  <SelectItem value="Vavuniya">Vavuniya</SelectItem>
                  <SelectItem value="Bandarawela">Bandarawela</SelectItem>
                  <SelectItem value="Walimada">Walimada</SelectItem>
                  <SelectItem value="Haputale">Haputale</SelectItem>
                  <SelectItem value="Monaragala">Monaragala</SelectItem>
                  <SelectItem value="Hambantota">Hambantota</SelectItem>
                  <SelectItem value="Ampara">Ampara</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop_type">Crop Type</Label>
              <Select onValueChange={(value) => handleSelectChange("crop_type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent className="bg-green-50">
                  <SelectItem value="Leeks">Leeks</SelectItem>
                  <SelectItem value="Cabbage">Cabbage</SelectItem>
                  <SelectItem value="Pumpkin">Pumpkin</SelectItem>
                  <SelectItem value="Carrot">Carrot</SelectItem>
                  <SelectItem value="Potato">Potato</SelectItem>
                  <SelectItem value="Onion">Onion</SelectItem>
                  <SelectItem value="Winged Bean">Winged Bean</SelectItem>
                  <SelectItem value="Beetroot">Beetroot</SelectItem>
                  <SelectItem value="Brinjal">Brinjal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="veg_variety">Variety</Label>
              <Select onValueChange={(value) => handleSelectChange("veg_variety", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select variety" />
                </SelectTrigger>
                <SelectContent className="bg-green-50">
                  <SelectItem value="Large Long Summer">Large Long Summer</SelectItem>
                  <SelectItem value="Detroit Dark Red">Detroit Dark Red</SelectItem>
                  <SelectItem value="Crimson Globe">Crimson Globe</SelectItem>
                  <SelectItem value="Jaffna Local">Jaffna Local</SelectItem>
                  <SelectItem value="Bombay Red">Bombay Red</SelectItem>
                  <SelectItem value="Hybrid Red Creole">Hybrid Red Creole</SelectItem>
                  <SelectItem value="Golden Star">Golden Star</SelectItem>
                  <SelectItem value="Granola">Granola</SelectItem>
                  <SelectItem value="Pathmma">Pathmma</SelectItem>
                  <SelectItem value="A.N.K">A.N.K</SelectItem>
                  <SelectItem value="Local Strains">Local Strains</SelectItem>
                  <SelectItem value="Butternut">Butternut</SelectItem>
                  <SelectItem value="SLS 44">SLS 44</SelectItem>
                  <SelectItem value="Krishna">Krishna</SelectItem>
                  <SelectItem value="Amanda F1">Amanda F1</SelectItem>
                  <SelectItem value="Anjalee-F1">Anjalee-F1</SelectItem>
                  <SelectItem value="HORDI Lenairi 1">HORDI Lenairi 1</SelectItem>
                  <SelectItem value="Thinnaweli purple">Thinnaweli purple</SelectItem>
                  <SelectItem value="Padagoda">Padagoda</SelectItem>
                  <SelectItem value="SM 164">SM 164</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected_harvest">Expected Harvest (kg)</Label>
              <Input
                id="expected_harvest"
                name="expected_harvest"
                type="number"
                value={formData.expected_harvest}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seed_source">Seed Source</Label>
              <Select onValueChange={(value) => handleSelectChange("seed_source", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select seed source" />
                </SelectTrigger>
                <SelectContent className="bg-green-50">
                  <SelectItem value="Department of Agriculture (DOA)">Department of Agriculture (DOA)</SelectItem>
                  <SelectItem value="Private Seed Suppliers">Private Seed Suppliers</SelectItem>
                  <SelectItem value="Local Agricultural Shops">Local Agricultural Shops</SelectItem>
                  <SelectItem value="Seed Saving">Seed Saving</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seed_quantity">Seed Quantity (kg)</Label>
              <Input
                id="seed_quantity"
                name="seed_quantity"
                type="number"
                value={formData.seed_quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seed_cost">Seed Cost (LKR)</Label>
              <Input
                id="seed_cost"
                name="seed_cost"
                type="number"
                value={formData.seed_cost}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil_type">Soil Type</Label>
              <Select onValueChange={(value) => handleSelectChange("soil_type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent className="bg-green-50">
                  <SelectItem value="Reddish Brown">Reddish Brown Earth (RBE)</SelectItem>
                  <SelectItem value="Alluvial Soils">Alluvial Soils</SelectItem>
                  <SelectItem value="Grumusols">Grumusols</SelectItem>
                  <SelectItem value="Sandy Loam Soil">Sandy Loam Soil</SelectItem>
                  <SelectItem value="Loamy Soil">Loamy Soil</SelectItem>
                  <SelectItem value="Silty Loam Soil">Silty Loam Soil</SelectItem>
                  <SelectItem value="Red Yellow Podzolic">Red Yellow Podzolic</SelectItem>
                  <SelectItem value="Mountain Reddish Brown">Mountain Reddish Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil_ph">Soil pH</Label>
              <Input
                id="soil_ph"
                name="soil_ph"
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={formData.soil_ph}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className="bg-green-50 hover:bg-green-300 hover:text-green-900"
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-300 hover:text-green-900"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting Session...
                </>
              ) : (
                "Start Session"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}