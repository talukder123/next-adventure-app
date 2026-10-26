'use client';
import { useState, type ChangeEvent, type FormEvent } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import type { IDestination } from "@/types/destination";

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

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"]; // nijer category diye replace koro
const fieldClass = "rounded-md bg-muted/60";

const toForm = (d?: Partial<IDestination>): FormState => ({
    name: d?.name ?? "",
    country: d?.country ?? "",
    category: d?.category ?? "",
    price: d?.price != null ? String(d.price) : "",
    duration: d?.duration ?? "",
    departureDate: d?.departureDate ? String(d.departureDate).slice(0, 10) : "",
    imageUrl: d?.imageUrl ?? "",
    description: d?.description ?? "",
});

type Props = { destination: IDestination };

const EditDestination = ({ destination }: Props) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(toForm(destination));
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const updateField =
        (field: keyof FormState) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = event.target;
            setForm((prev) => ({ ...prev, [field]: value }));
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        };

    function validate(): FormErrors {
        const e: FormErrors = {};
        if (!form.name.trim()) e.name = "Destination name is required";
        if (!form.country.trim()) e.country = "Country is required";
        if (!form.category) e.category = "Please select a category";
        if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price";
        if (form.imageUrl) {
            try {
                new URL(form.imageUrl);
            } catch {
                e.imageUrl = "Enter a valid URL";
            }
        }
        return e;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setServerError(null);

        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setSubmitting(true);
        try {
            const res = await fetch(
                `http://localhost:5000/destination/${destination._id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, price: Number(form.price) }),
                }
            );

            if (!res.ok) throw new Error(`Request failed (${res.status})`);

            const text = await res.text();
            const data = text ? JSON.parse(text) : null;
            console.log("updated destination", data);

            setOpen(false);
        } catch (err) {
            setServerError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    function handleOpenChange(next: boolean) {
        setOpen(next);
        if (!next) {
            // save na kore bondho korle ager value e ferot jabe
            setForm(toForm(destination));
            setErrors({});
            setServerError(null);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    />
                }
            >
                Edit
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Destination</DialogTitle>
                    <DialogDescription>
                        Update the details of this travel package.
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="edit-travel-package"
                    onSubmit={handleSubmit}
                    noValidate
                    className="grid gap-4"
                >
                    <Field>
                        <FieldLabel htmlFor="destination-name">Destination Name</FieldLabel>
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

                    {serverError && (
                        <p className="text-sm text-red-600" role="alert">
                            {serverError}
                        </p>
                    )}
                </form>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form="edit-travel-package" disabled={submitting}>
                        {submitting ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestination;