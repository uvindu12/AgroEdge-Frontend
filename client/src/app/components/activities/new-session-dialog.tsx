"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface NewSessionDialogProps {
    open: boolean
    onOpenChange : (open: boolean) => void
}

export function NewSessionDialog ({ open, onOpenChange } : NewSessionDialogProps ) {
    const router = useRouter ()
    const [isSubmitting, setIsSubmitting] = useState (false)
    const [formData , setFormData] = useState ({
        farm_size: "",
        farm_type: "",
        village: "",
        district: "",
        crop_type: "",
        veg_variety: "",
        expected_harvest: "",
        seed_type: "",
        seed_variety: "",
        seed_source: "",
        seed_quantity: "",
        seed_cost: "",
        soil_type: "",
        soil_ph: "",
    })

    const handleChange = (e: React. ChangeEvent <HTMLInputElement>) => {
        const {name, value } = e.target
        setFormData ((prev) => ({ ...prev, [name]: value}))
    }

    const handleSelectChange = (name : string, value: string) => {
        setFormData ((prev) => ({ ...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
    
        try {
          // In a real app, this would be an API call to create a new session
          await new Promise((resolve) => setTimeout(resolve, 1500))
    
          // Redirect to the new session page
          router.push("/activities/1")
          onOpenChange(false)
        } catch (error) {
          console.error("Error creating session:", error)
        } finally {
          setIsSubmitting(false)
        }
    }

    return (
        <Dialog open ={open} onOpenChange = {onOpenChange}>
            <DialogContent className ="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Start New Crop Session</DialogTitle>
                    <DialogDescription>Enterthe deatils to start trackin a new crop session</DialogDescription>
                </DialogHeader>

                <form onSubmit = {handleSubmit} className="space-y-4">
                    <div className ="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className ="space-y-2">
                            <Label htmlFor="farm_size">Farm Size(acres)</Label>
                            <Input id="farm_size" name="farm_size" value={formData.farm_size} onChange={handleChange} required/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="farm_type">Farm Type</Label>
                            <Select onValueChange ={(value) => handleSelectChange ("farm_typr", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder= "Select farm type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paddy">Paddy</SelectItem>
                                    <SelectItem value="vegetable">Vegetable</SelectItem>
                                    <SelectItem value ="fruit">Fruit</SelectItem>
                                    <SelectItem value ="mixed">Mixed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className ="space-y-2">
                            <Label htmlFor="village"></Label>
                            <Input id="village" name="village" value={formData.village} onChange={handleChange} required/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor ="district">District</Label>
                            <Select onValueChange ={(value) => handleSelectChange("district", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select district"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="Anuradhapura">Anuradhapura</SelectItem>
                                        <SelectItem value="Colombo">Colombo</SelectItem>
                                        <SelectItem value="Kandy">Kandy</SelectItem>
                                        <SelectItem value="Galle">Galle</SelectItem>
                                        <SelectItem value="Jaffna">Jaffna</SelectItem>
                                    </SelectContent>
                            </Select>
                        </div>

                        <div className ="space-y-2">
                            <Label htmlFor="crop_type">Crop Type</Label>
                            <Select onValueChange={(value) => handleSelectChange ("crop_type ", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select crop type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rice">Rice</SelectItem>
                                    <SelectItem value="vegetables">Vegetables</SelectItem>
                                    <SelectItem value="fruits">Fruits</SelectItem>
                                    <SelectItem value="grains">Grains</SelectItem>
                                    <SelectItem value="spices">Spices</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className ="space-y-2">
                            <Label htmlFor="veg_variety">Variety</Label>
                            <Input
                                id="veg_variety"
                                name="veg_variety"
                                value={formData.veg_variety}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className ="space-y-2">
                            <Label htmlFor ="expected_harvest">Expected Harvest (kg)</Label>
                            <Input
                                id="expected_harvest"
                                name="expected_harvest"
                                value={formData.expected_harvest}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className ="space-y-2">
                            <Label htmlFor="seed_type">Seed Type</Label>
                            <Select onValueChange ={(value) => handleSelectChange("seed_type", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select seed type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="certified">Certified</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="organic">Organic</SelectItem>
                                    <SelectItem value="traditional">Traditional</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className ="space-y-2">
                            <Label htmlFor ="seed_variety">Seed Variety</Label>
                            <Input
                                id="seed_variety"
                                name="seed_variety"
                                value={formData.seed_variety}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className ="space-y-2">
                            <Label htmlFor="seed_source">Seed Source</Label>
                            <Input
                                id="seed_source"
                                name="seed_source"
                                value={formData.seed_source}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className ="space-y-2">
                            <Label htmlFor="seed_quantity">Seed Quantity (kg)</Label>
                            <Input
                                id="seed_quantity"
                                name="seed_quantity"
                                value={formData.seed_quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className ="space-y-2">
                            <Label htmlFor="seed_cost">Seed Cost (LKR)</Label>
                            <Input
                                id="seed_cost"
                                name="seed_cost"
                                value={formData.seed_cost}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Soil Details */}

                        <div className="space-y-2">
                            <Label htmlFor="soil_type">Soil Type</Label>
                            <Select onValueChange={(value) => handleSelectChange("soil_type", value)}>
                                <SelectTrigger>
                                <SelectValue placeholder="Select soil type" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="clay">Clay</SelectItem>
                                <SelectItem value="loamy">Loamy</SelectItem>
                                <SelectItem value="sandy">Sandy</SelectItem>
                                <SelectItem value="silt">Silt</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soil_ph">Soil pH</Label>
                            <Input id="soil_ph" name="soil_ph" value={formData.soil_ph} onChange={handleChange} required />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
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
    )
}