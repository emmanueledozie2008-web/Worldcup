import React from "react";
import { FaTrophy, FaFutbol, FaArrowRight } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";

const Bracket: React.FC = () => {
  const groupA = [
    { team: "MEX", flag: "🇲🇽", rank: 1 },
    { team: "RSA", flag: "🇿🇦", rank: 2 },
    { team: "KOR", flag: "🇰🇷", rank: 3 },
    { team: "FIFA POD", flag: "🏆", rank: 4 },
  ];

  const groupB = [
    { team: "BRA", flag: "🇧🇷", rank: 1 },
    { team: "GER", flag: "🇩🇪", rank: 2 },
    { team: "ARG", flag: "🇦🇷", rank: 3 },
    { team: "FRA", flag: "🇫🇷", rank: 4 },
  ];

  return (
    <section className="bg-gray-900 text-white py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Legend */}
        <div className="text-xs text-gray-400 mb-6 flex flex-wrap gap-3">
          <span><b className="text-white">I</b> = Qualified</span>
          <span><b className="text-white">P</b> = Played</span>
          <span><b className="text-white">W</b> = Wins</span>
          <span><b className="text-white">D</b> = Draw</span>
          <span><b className="text-white">L</b> = Loss</span>
          <span><b className="text-white">GD</b> = Goal Diff</span>
          <span><b className="text-white">Pts</b> = Points</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold uppercase">
              Bracket Challenge
            </h2>
            <p className="text-gray-400 text-sm md:text-lg mt-1">
              Who will finish top of the group?
            </p>
          </div>

          <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2">
            SUBMIT YOUR PREDICTIONS <FaArrowRight />
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Groups */}
          <div className="space-y-6">

            {[{title:"Group A",data:groupA},{title:"Group B",data:groupB}].map((group)=>(
              <div key={group.title} className="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700 shadow-xl">
                <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                  <GiSoccerBall className="text-red-500" />
                  {group.title}
                </h3>

                <div className="space-y-2">
                  {group.data.map((item)=>(
                    <div key={item.team} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.flag}</span>
                        <span className="text-sm md:text-base">{item.team}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="font-bold text-red-400">{item.rank}</span>
                        {item.rank === 1 && (
                          <FaTrophy className="text-yellow-400 ml-1 text-sm" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {group.title==="Group A" && (
                  <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                    <FaFutbol /> FIFA POD is the official predictor's pick.
                  </p>
                )}
              </div>
            ))}

          </div>

          {/* Bracket */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 md:p-6 border border-gray-700 shadow-2xl">

              <h3 className="text-lg md:text-2xl font-bold mb-6 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                Knockout Bracket Preview
              </h3>

              {/* MOBILE FIX: horizontal scroll */}
              <div className="overflow-x-auto">
                <div className="grid grid-cols-4 gap-4 min-w-[700px]">

                  {/* Round of 16 */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 uppercase">Round of 16</div>
                    {[...Array(4)].map((_,i)=>(
                      <div key={i} className="bg-gray-700 p-2 rounded border-l-4 border-red-500">
                        <div className="text-xs text-gray-300">Match {i+1}</div>
                        <div className="flex justify-between text-sm opacity-80">
                          <span>TBD</span>
                          <span>vs</span>
                          <span>TBD</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quarter */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 uppercase">Quarter</div>
                    {[...Array(2)].map((_,i)=>(
                      <div key={i} className="bg-gray-700 p-2 rounded border-l-4 border-yellow-500">
                        <div className="text-xs">QF {i+1}</div>
                        <div className="flex justify-between text-sm opacity-80">
                          <span>TBD</span>
                          <span>vs</span>
                          <span>TBD</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Semi */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 uppercase">Semi</div>
                    {[...Array(2)].map((_,i)=>(
                      <div key={i} className="bg-gray-700 p-2 rounded border-l-4 border-orange-500">
                        <div className="text-xs">SF {i+1}</div>
                        <div className="flex justify-between text-sm opacity-80">
                          <span>TBD</span>
                          <span>vs</span>
                          <span>TBD</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 uppercase">Final</div>
                    <div className="bg-yellow-600 p-3 rounded-lg text-sm font-bold flex justify-between">
                      <span>TBD</span>
                      <span>vs</span>
                      <span>TBD</span>
                    </div>
                    <div className="text-center text-xs text-gray-500">
                      🏆 Winner
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-6 rounded-full">
                  Fill your bracket
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Bracket;