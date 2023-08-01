import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react"
import { cn } from "@/utils/utils";
import {EditDocumentIcon} from "@/components/icons/edit";
import {DeleteDocumentIcon} from "@/components/icons/delete";
import { SuggestionColumn } from "./column";

interface CellActionProps {
    data : SuggestionColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
        auto
        flat
        color="primary"
        >
          ...
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description" className="bg-red-200/50 p-3 rounded-2xl">
        <DropdownItem
        className="text-lg mb-4 border border-black rounded-lg px-3"
          key="edit"
          startContent={<EditDocumentIcon className="cursor-pointer mr-2 h-4 w-4" />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
        className="text-lg border border-black rounded-lg px-3"
          key="delete"
          color="danger"
          startContent={<DeleteDocumentIcon className="cursor-pointer mr-2 h-4 w-4" />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
