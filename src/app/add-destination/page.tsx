"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CircleCheckIcon, ImageIcon, TrashIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Desert",
  "Adventure",
  "Cultural",
  "Wildlife",
];

type FormState = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const fieldClass = "h-10 rounded-md bg-muted/60";

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Destination name is required.";
  }
  if (!form.country.trim()) {
    errors.country = "Country is required.";
  }
  if (!form.category) {
    errors.category = "Please select a category.";
  }
  if (!form.price.trim()) {
    errors.price = "Price is required.";
  } else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = "Enter a valid price.";
  }

  return errors;
}

export default function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [addedPackage, setAddedPackage] = useState<string | null>(null);

  const updateField =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("http://localhost:5000/add-destination", {
        method: "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(form)
    });

    const data = await res.json();

    console.log("des data form", data);
  }

  function handleCancel() {
    setForm(initialForm);
    setErrors({});
    setAddedPackage(null);
  }

  return (
    <main className="flex flex-1 flex-col bg-white px-5 py-12 sm:px-8 mt-10 sm:py-16 mt-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <h1 className="text-4xl font-light tracking-tight text-slate-900 sm:text-5xl">
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-10 w-full max-w-xl rounded-lg shadow-sm">
          <CardContent className="px-6">
            {addedPackage && (
              <Alert className="mb-5 border-brand/30 bg-brand/5 [&>svg]:text-brand">
                <CircleCheckIcon />
                <AlertTitle>Travel package added!</AlertTitle>
                <AlertDescription>
                  &quot;{addedPackage}&quot; is now part of your catalog.
                </AlertDescription>
              </Alert>
            )}

            <form
              id="add-travel-package"
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-4"
            >
              <Field>
                <FieldLabel htmlFor="destination-name">
                  Destination Name
                </FieldLabel>
                <Input
                  id="destination-name"
                  name="name"
                  placeholder="Bali Paradise"
                  value={form.name}
                  onChange={updateField("name")}
                  aria-invalid={errors.name ? true : undefined}
                  className={fieldClass}
                />
                <FieldError>{errors.name}</FieldError>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="country">Country</FieldLabel>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Indonesia"
                    value={form.country}
                    onChange={updateField("country")}
                    aria-invalid={errors.country ? true : undefined}
                    className={fieldClass}
                  />
                  <FieldError>{errors.country}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select
                    value={form.category || null}
                    onValueChange={(value) => {
                      setForm((prev) => ({ ...prev, category: value ?? "" }));
                      setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                  >
                    <SelectTrigger
                      id="category"
                      aria-invalid={errors.category ? true : undefined}
                      className={`w-full ${fieldClass}`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>{errors.category}</FieldError>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g., 1299"
                    value={form.price}
                    onChange={updateField("price")}
                    aria-invalid={errors.price ? true : undefined}
                    className={fieldClass}
                  />
                  <FieldError>{errors.price}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="duration">Duration</FieldLabel>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    value={form.duration}
                    onChange={updateField("duration")}
                    className={fieldClass}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="departure-date">Departure Date</FieldLabel>
                <Input
                  id="departure-date"
                  name="departureDate"
                  type="date"
                  value={form.departureDate}
                  onChange={updateField("departureDate")}
                  className={fieldClass}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image-url">Image URL</FieldLabel>
                <Input
                  id="image-url"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={updateField("imageUrl")}
                  aria-invalid={errors.imageUrl ? true : undefined}
                  className={fieldClass}
                />
                <FieldError>{errors.imageUrl}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the travel experience..."
                  value={form.description}
                  onChange={updateField("description")}
                  className="min-h-32 rounded-md bg-muted/60"
                />
              </Field>
            </form>
          </CardContent>

          <CardFooter className="justify-end gap-3 border-t-0 bg-transparent px-6 pb-6 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-10 gap-2 rounded-md border-destructive/30 px-4 text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <TrashIcon />
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-travel-package"
              className="h-10 gap-2 rounded-md bg-brand px-4 text-white hover:bg-brand-dark"
            >
              <ImageIcon />
              Add Travel Package
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
