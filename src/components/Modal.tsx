import { MouseEvent, useEffect, useState } from "react";
import { ChevronLeft, Minus } from "lucide-react";
import { schemaOptions } from "../constants/data";
import toast from "react-hot-toast";
import { saveSegment } from "../api/webhook";
import Spinner from "./Spinner";
import { ModalProps, SchemaOption } from "../types/schema";

const Modal = ({ isActive, onClose }: ModalProps) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemas, setSchemas] = useState<SchemaOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addSchema = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!selectedSchema) {
      toast.error("Select one of the options");
      return;
    }

    const newSchema = schemaOptions.find(
      (option) => option.value === selectedSchema,
    );

    if (newSchema) {
      setSchemas([...schemas, newSchema]);
      setSelectedSchema("");
    }
  };

  const updateSchema = (index: number, value: string) => {
    const newSchema = schemaOptions.find((option) => option.value === value);

    if (newSchema) {
      const updatedSchemas = [...schemas];
      updatedSchemas[index] = newSchema;
      setSchemas(updatedSchemas);
    }
  };

  const removeSchema = (index: number) => {
    const newSchema = schemas.filter((_, i) => i !== index);
    setSchemas(newSchema);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!segmentName) {
        toast.error("Segment name cannot be empty");
        setIsLoading(false);
        return;
      }

      if (schemas.length === 0) {
        toast.error("You must add at least one schema");
        setIsLoading(false);
        return;
      }

      const webhookSchema = schemas.map((schema) => ({
        [schema.label]: schema.value,
      }));

      await saveSegment({ segment_name: segmentName, schema: webhookSchema });

      //simulating 2seconda delay since there is no response from webhooks

      setTimeout(() => {
        console.log("Segment sent successfully!");
        toast.success("Segment saved successfully!");

        setSegmentName("");
        setSchemas([]);
        setSelectedSchema("");
        onClose();
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save segment. Please try again.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {isLoading && <Spinner />}

      {/* Modal full background */}
      <div
        className={`bg-dark fixed inset-0 transition-opacity duration-300 ease-in-out ${
          isActive ? "bg-opacity-40" : "pointer-events-none bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/*  Sidebar */}

      <aside
        className={`bg-paleBlue fixed right-0 top-0 flex h-full w-1/4 transform flex-col shadow-xl transition-transform duration-300 ${
          isActive ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-start p-4 space-x-2 bg-teal text-paleBlue">
          <button onClick={onClose}>
            <ChevronLeft className="w-6 h-6 text-paleBlue" />
          </button>
          <p className="text-xl">Saving segment</p>
        </div>

        <div className="p-4 space-y-4">
          <label className="text-sm font-semibold">
            Enter the Name of the Segment
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 font-semibold border rounded focus-within:ring-teal placeholder:text-sm focus-within:ring-2 focus:outline-none"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name your segment"
          />
        </div>

        <div className="p-4 space-y-4">
          <span className="text-sm font-semibold">
            To save your segments, you need to add the schemas to build the
            query
          </span>
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-teal" />
              <span className="text-xs">- User Tasks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <span className="text-xs">- Group Tasks</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between p-4 space-y-4">
          {schemas.map((schema, index) => {
            const currentFilteredOptions = [
              schema,
              ...schemaOptions.filter(
                (ele) => !schemas.find(({ value }) => value === ele.value),
              ),
            ];

            return (
              <div
                key={`${schema.value}-${index}`}
                className="flex items-center justify-between w-full space-x-4"
              >
                <select
                  className="w-full px-2 py-1 text-sm font-semibold border rounded focus-within:ring-teal focus-within:ring-2 focus:outline-none"
                  value={schema.value}
                  onChange={(e) => updateSchema(index, e.target.value)}
                >
                  {currentFilteredOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-sm font-semibold"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <Minus
                  className="w-8 h-8 rounded-md cursor-pointer bg-teal/20 text-midnight"
                  onClick={() => removeSchema(index)}
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-start flex-1 p-4 border-t-2 border-midnight/15">
          <div className="flex items-center justify-between w-full space-x-4">
            <select
              className="w-full px-2 py-1 text-sm font-semibold border rounded focus-within:ring-teal focus-within:ring-2 focus:outline-none"
              value={selectedSchema}
              onChange={(e) => setSelectedSchema(e.target.value)}
            >
              <option value="">Add schema to segment</option>
              {schemaOptions
                .filter(
                  (ele) => !schemas.find(({ value }) => value === ele.value),
                )
                .map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-sm font-semibold"
                  >
                    {option.label}
                  </option>
                ))}
            </select>
            <Minus className="w-8 h-8 rounded-md cursor-pointer bg-teal/20 text-midnight" />
          </div>

          <div className="p-4">
            <a
              href="#"
              className="text-sm font-bold underline text-teal"
              onClick={addSchema}
            >
              + Add new schema
            </a>
          </div>
        </div>

        <div className="p-4 space-x-4 bg-dark/25">
          <button
            className="px-4 py-2 font-semibold rounded-lg bg-teal text-paleBlue"
            onClick={handleSubmit}
          >
            Save the Segment
          </button>
          <button
            className="px-4 py-2 font-semibold rounded-lg bg-paleBlue text-danger"
            onClick={() => onClose()}
          >
            cancel
          </button>
        </div>
      </aside>
    </>
  );
};

export default Modal;
