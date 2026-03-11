import React from "react";

const Standing: React.FC = () => {
  const groupA = [
    { pos: 1, code: "mx", team: "MEX" },
    { pos: 2, code: "za", team: "RSA" },
    { pos: 3, code: "kr", team: "KOR" },
    { pos: 4, code: "eu", team: "DEN/MKD/CZE/IRL" },
  ];

  const groupB = [
    { pos: 1, code: "ca", team: "CAN" },
    { pos: 2, code: "qa", team: "QAT" },
    { pos: 3, code: "ch", team: "SUI" },
    { pos: 4, code: "eu", team: "ITA/NIR/WAL/BIH" },
  ];

  const groupC = [
    { pos: 1, code: "br", team: "BRA" },
    { pos: 2, code: "ma", team: "MAR" },
    { pos: 3, code: "ht", team: "HAI" },
    { pos: 4, code: "sc", team: "SCO" },
  ];
  
  const groupD = [
    { pos: 1, code: "us", team: "USA" },
    { pos: 2, code: "py", team: "PAR" },
    { pos: 3, code: "au", team: "AUS" },
    { pos: 4, code: "eu", team: "TUR/ROU/SVK/KOS" },
  ];

  const groupE = [
    { pos: 1, code: "de", team: "GER" }, // Germany
    { pos: 2, code: "cw", team: "CUW" }, // Curaçao
    { pos: 3, code: "ci", team: "CIV" }, // Ivory Coast
    { pos: 4, code: "ec", team: "ECU" }, // Ecuador
  ];

  const groupF = [
    { pos: 1, code: "nl", team: "NED" }, // Netherlands
    { pos: 2, code: "jp", team: "JPN" }, // Japan
    { pos: 3, code: "tr", team: "TUR" }, // Turkey
    { pos: 4, code: "eu", team: "UKR/SWE/POL/ALB" }, // playoff placeholder
  ];


  const groupG = [
    { pos: 1, code: "be", team: "BEL" }, // Belgium
    { pos: 2, code: "eg", team: "EGY" }, // Egypt
    { pos: 3, code: "ir", team: "IRN" }, // Iran
    { pos: 4, code: "nz", team: "NZL" }, // New Zealand
  ];
  
  const groupH = [
    { pos: 1, code: "es", team: "ESP" }, // Spain
    { pos: 2, code: "cv", team: "CPV" }, // Cape Verde
    { pos: 3, code: "sa", team: "KSA" }, // Saudi Arabia
    { pos: 4, code: "uy", team: "URU" }, // Uruguay
  ];
  
  const groupI = [
    { pos: 1, code: "un", team: "BOL/BUR/IRQ" }, // Playoff placeholder
    { pos: 2, code: "fr", team: "FRA" }, // France
    { pos: 3, code: "sn", team: "SEN" }, // Senegal
    { pos: 4, code: "no", team: "NOR" }, // Norway
  ];
  
  const groupJ = [
    { pos: 1, code: "ar", team: "ARG" }, // Argentina
    { pos: 2, code: "dz", team: "ALG" }, // Algeria
    { pos: 3, code: "at", team: "AUT" }, // Austria
    { pos: 4, code: "jo", team: "JOR" }, // Jordan
  ];

  const groupK = [
    { pos: 1, code: "un", team: "NCL/JAM/COD" }, // Playoff placeholder
    { pos: 2, code: "pt", team: "POR" }, // Portugal
    { pos: 3, code: "uz", team: "UZB" }, // Uzbekistan
    { pos: 4, code: "co", team: "COL" }, // Colombia
  ];
  const groupL = [
    { pos: 1, code: "gb-eng", team: "ENG" }, // England
    { pos: 2, code: "hr", team: "CRO" }, // Croatia
    { pos: 3, code: "gh", team: "GHA" }, // Ghana
    { pos: 4, code: "pa", team: "PAN" }, // Panama
  ];
  const Table = ({ title, data }: any) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex gap-8 text-sm text-gray-500 font-medium">
          <span>P</span>
          <span>W</span>
          <span>D</span>
          <span>L</span>
          <span>GD</span>
          <span>Pts</span>
        </div>
      </div>

      {/* Rows */}
      {data.map((team: any) => (
        <div
          key={team.pos}
          className="flex justify-between items-center px-6 py-4 border-b last:border-none hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">

            <span className="text-gray-600">{team.pos}</span>

            {/* Country Flag */}
            <img
              src={`https://flagcdn.com/w40/${team.code}.png`}
              alt={team.team}
              className="w-6 h-4 object-cover rounded-sm"
            />

            <span className="font-medium">{team.team}</span>

          </div>

          <div className="flex gap-8 text-gray-700">
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span className="font-semibold">0</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">Standings</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Table title="Group A" data={groupA} />
          <Table title="Group B" data={groupB} />
          <Table  title="Group C" data={groupC}/>
          <Table  title="Group D" data={groupD}/>
          <Table  title="Group E" data={groupE}/>
          <Table  title="Group F" data={groupF}/>
          <Table  title="Group G" data={groupG}/>
          <Table  title="Group H" data={groupH}/>
          <Table  title="Group I" data={groupI}/>
          <Table  title="Group J" data={groupJ}/>
          <Table  title="Group k" data={groupK}/>
          <Table  title="Group L" data={groupL}/>
        </div>

      </div>
    </section>
  );
};

export default Standing;