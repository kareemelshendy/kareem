"use client";

import { useState } from "react";
import { Company } from "../types";
import StatusBadge from "../components/StatusBadge";
import ActionsButton from "../components/ActionsButton";

const initialData: Company[] = [
  {
    company: "XYZ Corp",
    locations: [
      {
        name: "Downtown",
        zones: [{ name: "Lobby", status: "online" }],
      },
      {
        name: "City Center",
        zones: [
          { name: "Main Hall", status: "offline" },
          { name: "Conference Room", status: "offline" },
        ],
      },
      {
        name: "Uptown",
        zones: [
          { name: "Main Room", status: "offline" },
          { name: "Meeting Room", status: "online" },
        ],
      },
    ],
  },
  {
    company: "ABC Corp",
    locations: [
      {
        name: "Downtown",
        zones: [
          { name: "Lobby", status: "online" },
          { name: "Main Hall", status: "offline" },
          { name: "Conference Room", status: "offline" },
        ],
      },
    ],
  },
  // Add more companies as needed...
];

export default function CompaniesPage() {
  const [companies] = useState<Company[]>(initialData);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F1F5F6] mb-4">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-900 border-b border-gray-200">
                Company
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-900 border-b border-gray-200">
                Locations
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-900 border-b border-gray-200">
                Zones
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-900 border-b border-gray-200">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-900 border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, companyIndex) => (
              <CompanyRow
                key={`company-${companyIndex}`}
                company={company}
                isLast={companyIndex === companies.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompanyRow({
  company,
  isLast,
}: {
  company: Company;
  isLast: boolean;
}) {
  return (
    <>
      <tr className="bg-gray-200/20">
        <td colSpan={5} className="py-2 px-6 text-sm font-medium text-gray-900">
          {company.company}
        </td>
      </tr>
      {company.locations.map((location, locationIndex) =>
        location.zones.map((zone, zoneIndex) => (
          <tr
            key={`${location.name}-${zone.name}`}
            className="border-t first:border-t-0"
          >
            <td className="py-4 px-6 text-sm"></td>
            <td className="py-4 px-6 text-sm text-gray-600">{location.name}</td>
            <td className="py-4 px-6 text-sm text-gray-600">{zone.name}</td>
            <td className="py-4 px-6">
              <StatusBadge status={zone.status} />
            </td>
            <td className="py-4 px-6">
              <ActionsButton />
            </td>
          </tr>
        ))
      )}
      {!isLast && (
        <tr className="h-[1px] bg-gray-200">
          <td colSpan={5}></td>
        </tr>
      )}
    </>
  );
}
