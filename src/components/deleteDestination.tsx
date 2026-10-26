'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
    id: string;
    onDeleted?: (id: string) => void; // client-side list hole eta diye state update koro
};

const DeleteDestination = ({ id, onDeleted }: Props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteDes = async () => {
        setDeleting(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:5000/destination/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error(`Delete failed (${res.status})`);

            // backend pathay: { acknowledged: true, deletedCount: 1 }
            const text = await res.text();
            const data = text ? JSON.parse(text) : null;

            if (data && data.deletedCount === 0) {
                throw new Error("Destination not found");
            }

            setOpen(false);
            onDeleted?.(id); // client list theke item remove
            router.push("/destinations");
            router.refresh(); // server component list refresh
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(next) => {
                if (deleting) return; // delete cholar somoy bondho hobe na
                setOpen(next);
                if (!next) setError(null);
            }}
        >
            <AlertDialogTrigger
                render={
                    <button
                        type="button"
                        className="rounded-lg border border-red-700 px-6 py-3 font-semibold text-red-700 transition hover:bg-gray-50"
                    />
                }
            >
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        destination from our servers.
                    </AlertDialogDescription>
                    {error && (
                        <p className="text-sm text-red-600" role="alert">
                            {error}
                        </p>
                    )}
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDeleteDes}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Confirm"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDestination;