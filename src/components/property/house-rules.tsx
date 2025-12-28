import { PropertyPolicies } from "@/types/property";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  Ban,
  CheckCircle,
  Info,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface HouseRulesProps {
  policies: PropertyPolicies;
  className?: string;
}

export function HouseRules({ policies, className = "" }: HouseRulesProps) {
  return (
    <section className={`${className}`}>
      <h2 className="heading-2 mb-6">House Rules & Policies</h2>

      {/* Check-in/Check-out */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-stone-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-stone-600" />
            <h3 className="font-medium text-stone-900">Check-in</h3>
          </div>
          <p className="text-stone-600">{policies.checkIn.time}</p>
          {policies.checkIn.instructions && (
            <p className="text-sm text-stone-500 mt-1">
              {policies.checkIn.instructions}
            </p>
          )}
        </div>

        <div className="border border-stone-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-stone-600" />
            <h3 className="font-medium text-stone-900">Check-out</h3>
          </div>
          <p className="text-stone-600">{policies.checkOut.time}</p>
          {policies.checkOut.instructions && (
            <p className="text-sm text-stone-500 mt-1">
              {policies.checkOut.instructions}
            </p>
          )}
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="mb-8 border border-stone-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="h-5 w-5 text-stone-600" />
          <h3 className="font-medium text-stone-900">Cancellation Policy</h3>
        </div>
        <p className="text-sm text-stone-600 mb-3">{policies.cancellation.description}</p>
        <div className="space-y-2">
          {policies.cancellation.refundRules.map((rule, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-stone-600">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>
                {rule.daysBeforeCheckIn} days before check-in: {rule.refundPercentage}% refund
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* House Rules Accordion */}
      <Accordion type="single" collapsible className="border border-stone-200 rounded-lg">
        {policies.houseRules.map((rule, index) => (
          <AccordionItem key={rule.id} value={`rule-${index}`}>
            <AccordionTrigger className="px-4 text-left">
              <div className="flex items-center gap-3">
                {rule.type === "allowed" && (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
                {rule.type === "not_allowed" && (
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                )}
                {rule.type === "info" && (
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                )}
                <span className="font-medium">{rule.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 text-stone-600">
              {rule.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Safety Information */}
      {policies.safetyInfo && policies.safetyInfo.length > 0 && (
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Safety Information
          </h3>
          <ul className="space-y-2">
            {policies.safetyInfo.map((info, index) => (
              <li key={index} className="text-sm text-amber-800 flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
