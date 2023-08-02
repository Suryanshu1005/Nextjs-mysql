"use client";

import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react"
import { cn } from "@/utils/utils";
import { EditDocumentIcon } from "@/components/icons/edit";
import { DeleteDocumentIcon } from "@/components/icons/delete";
import { SuggestionColumn } from "./column";
import { AlertModal } from "@/components/canvas/alert-modal";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface CellActionProps {
  data: SuggestionColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.userid}/suggestions/${data.id}`)
      toast.success('Suggestion Deleted');
      router.refresh();
    } catch (error) {
      toast.error('Can not delete the suggestion');
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        onConfirm={onConfirm}
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button
            auto
            flat
            color="primary"
          >
            action
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu with description" className="bg-white p-3 rounded-2xl border-none">
          <DropdownItem
          variant="faded"
          >
            <div className="flex justify-center items-center">
              <Button color="secondary" flat className="flex items-center justify-center mb-2 mt-2 ">Edit suggestion</Button>
            </div>
          </DropdownItem>
          <DropdownItem
            onPress={onConfirm}
          >
            <div className="flex justify-center items-center">
              <Button color="error" flat className="flex items-center justify-center mb-2 mt-2 ml-2 mr-2">Delete suggestion</Button>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
