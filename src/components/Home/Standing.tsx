import React from "react";

type Team = {
  pos: number;
  code: string;
  team: string;
};

const Standing: React.FC = () => {

  const groupA: Team[] = [
    { pos: 1, code: "mx", team: "MEX" },
    { pos: 2, code: "za", team: "RSA" },
    { pos: 3, code: "kr", team: "KOR" },
    { pos: 4, code: "eu", team: "DEN/MKD/CZE/IRL" },
  ];

  const groupB: Team[] = [
    { pos: 1, code: "ca", team: "CAN" },
    { pos: 2, code: "qa", team: "QAT" },
    { pos: 3, code: "ch", team: "SUI" },
    { pos: 4, code: "eu", team: "ITA/NIR/WAL/BIH" },
  ];

  const groupC: Team[] = [
    { pos: 1, code: "br", team: "BRA" },
    { pos: 2, code: "ma", team: "MAR" },
    { pos: 3, code: "ht", team: "HAI" },
    { pos: 4, code: "sc", team: "SCO" },
  ];

  const groupD: Team[] = [
    { pos: 1, code: "us", team: "USA" },
    { pos: 2, code: "py", team: "PAR" },
    { pos: 3, code: "au", team: "AUS" },
    { pos: 4, code: "eu", team: "TUR/ROU/SVK/KOS" },
  ];

  const groupE: Team[] = [
    { pos: 1, code: "de", team: "GER" },
    { pos: 2, code: "cw", team: "CUW" },
    { pos: 3, code: "ci", team: "CIV" },
    { pos: 4, code: "ec", team: "ECU" },
  ];

  const groupF: Team[] = [
    { pos: 1, code: "nl", team: "NED" },
    { pos: 2, code: "jp", team: "JPN" },
    { pos: 3, code: "tr", team: "TUR" },
    { pos: 4, code: "eu", team: "UKR/SWE/POL/ALB" },
  ];

  const groupG: Team[] = [
    { pos: 1, code: "be", team: "BEL" },
    { pos: 2, code: "eg", team: "EGY" },
    { pos: 3, code: "ir", team: "IRN" },
    { pos: 4, code: "nz", team: "NZL" },
  ];

  const groupH: Team[] = [
    { pos: 1, code: "es", team: "ESP" },
    { pos: 2, code: "cv", team: "CPV" },
    { pos: 3, code: "sa", team: "KSA" },
    { pos: 4, code: "uy", team: "URU" },
  ];

  const groupI: Team[] = [
    { pos: 1, code: "un", team: "BOL/BUR/IRQ" },
    { pos: 2, code: "fr", team: "FRA" },
    { pos: 3, code: "sn", team: "SEN" },
    { pos: 4, code: "no", team: "NOR" },
  ];

  const groupJ: Team[] = [
    { pos: 1, code: "ar", team: "ARG" },
    { pos: 2, code: "dz", team: "ALG" },
    { pos: 3, code: "at", team: "AUT" },
    { pos: 4, code: "jo", team: "JOR" },
  ];

  const groupK: Team[] = [
    { pos: 1, code: "un", team: "NCL/JAM/COD" },
    { pos: 2, code: "pt", team: "POR" },
    { pos: 3, code: "uz", team: "UZB" },
    { pos: 4, code: "co", team: "COL" },
  ];

  const groupL: Team[] = [
    { pos: 1, code: "gb-eng", team: "ENG" },
    { pos: 2, code: "hr", team: "CRO" },
    { pos: 3, code: "gh", team: "GHA" },
    { pos: 4, code: "pa", team: "PAN" },
  ];

  const Table = ({ title, data }: { title: string; data: Team[] }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

        <h2 className="text-lg font-bold">{title}</h2>

        <div className="flex gap-6 text-sm font-medium opacity-90">
          <span>P</span>
          <span>W</span>
          <span>D</span>
          <span>L</span>
          <span>GD</span>
          <span>Pts</span>
        </div>

      </div>

      {/* Rows */}
      {data.map((team) => (
        <div
          key={team.pos}
          className={`flex justify-between items-center px-6 py-4 border-b last:border-none transition
          ${team.pos <= 2 ? "bg-green-50" : "bg-white"}
          hover:bg-gray-50`}
        >
          <div className="flex items-center gap-4">

            <span className="text-gray-500 w-4">{team.pos}</span>

            <img
              src={`https://flagcdn.com/w40/${team.code}.png`}
              alt={team.team}
              className="w-7 h-5 object-cover rounded-sm shadow-sm"
            />

            <span className="font-semibold text-gray-800">
              {team.team}
            </span>

          </div>

          <div className="flex gap-6 text-gray-700 text-sm">
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span className="font-bold">0</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
          World Cup Standings
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Table title="Group A" data={groupA} />
          <Table title="Group B" data={groupB} />
          <Table title="Group C" data={groupC} />
          <Table title="Group D" data={groupD} />
          <Table title="Group E" data={groupE} />
          <Table title="Group F" data={groupF} />
          <Table title="Group G" data={groupG} />
          <Table title="Group H" data={groupH} />
          <Table title="Group I" data={groupI} />
          <Table title="Group J" data={groupJ} />
          <Table title="Group K" data={groupK} />
          <Table title="Group L" data={groupL} />

        </div>

      </div>

    </section>
  );
};

export default Standing;