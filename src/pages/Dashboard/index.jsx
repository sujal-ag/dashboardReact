import React, { useState, useEffect } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import flaggedMessagesData from './helper';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(''); //Abhi not in use pr use for month selection
  const [activeTab, setActiveTab] = useState('All');
  const [fiveStarTrendData, setFiveStarTrendData] = useState([]);
  const [flaggedMessages, setFlaggedMessages] = useState([]);
  const [starCounts, setStarCounts] = useState({
    five: 0,
    four: 0,
    three: 0,
  });

  const monthOptions = [
    { label: 'March 2025', value: 'march_2025' },
    { label: 'February 2025', value: 'february_2025' },
    { label: 'January 2025', value: 'january_2025' },
  ];

  const tabs = ['All']; // Add karunga more tabs later

  useEffect(() => {
    setFlaggedMessages(flaggedMessagesData);
  }, []);

  useEffect(() => {
    const counts = { five: 0, four: 0, three: 0 };

    flaggedMessages.forEach((msg) => {
      if (msg.risk_score === 5) counts.five += 1;
      else if (msg.risk_score === 4) counts.four += 1;
      else if (msg.risk_score === 3) counts.three += 1;
    });

    setStarCounts(counts);
  }, [flaggedMessages]);

  useEffect(() => {
    const countsByDate = {};

    flaggedMessages.forEach((msg) => {
      if (msg.risk_score === 5) {
        const date = new Date(msg.timestamp).toLocaleDateString();
        countsByDate[date] = (countsByDate[date] || 0) + 1;
      }
    });

    const data = Object.entries(countsByDate).map(([date, count]) => ({
      date,
      count,
    }));

    setFiveStarTrendData(data);
  }, [flaggedMessages]);


  const handleMonthSelect = (option) => {
    setSelectedMonth(option.value);
  };

  return (
    <div className="w-full h-screen flex">
      <main className="flex-1 w-full h-full lg:ml-0">
        <div className="bg-global-1 rounded-[40px] m-2 sm:m-4 lg:m-8 w-full h-full shadow-[0px_27px_80px_#00000028]">
          <div className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-10">
            <h1 className="text-4xl text-white font-bold text-center">DashBoard</h1>

            {/* Total Stars wala Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Container: No. of Stars */}
              <div className="grid grid-cols-2 gap-2">
                {[5, 4].map((star) => (
                  <div
                    key={star}
                    className="bg-global-4 rounded-[14px] p-4 flex flex-col items-center w-[250px] h-[150px] mx-auto"
                  >
                    <div className="flex">
                      {Array.from({ length: star }).map((_, i) => (
                        <img
                          key={i}
                          src="/images/img_star.svg"
                          alt={`${star} star`}
                          className="w-[20px] h-[20px]"
                        />
                      ))}
                    </div>
                    <h2 className="text-global-3 text-[22px] font-bold mt-2">
                      {starCounts[star === 5 ? 'five' : 'four']}
                    </h2>
                    <p className="text-global-2 text-[14px]">{star} Stars</p>
                  </div>
                ))}

                {/* Third card spanning both columns */}
                <div className="bg-global-4 rounded-[14px] p-4 flex flex-col items-center col-span-2 w-[250px] h-[150px] mx-auto">
                  <div className="flex">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <img
                        key={i}
                        src="/images/img_star.svg"
                        alt="3 star"
                        className="w-[20px] h-[20px]"
                      />
                    ))}
                  </div>
                  <h2 className="text-global-3 text-[22px] font-bold mt-2">
                    {starCounts['three']}
                  </h2>
                  <p className="text-global-2 text-[14px]">3 Stars</p>
                </div>
              </div>

              {/* Right Container: Line Chart */}
              <div className="bg-global-4 rounded-[14px] p-4 flex flex-col items-center">
                <h2 className="text-global-3 text-[18px] font-bold mb-2">5-Star Trend</h2>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fiveStarTrendData}>
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#ff5e35" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Employee wala Section */}
            <section className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-global-3 text-2xl sm:text-[27px] font-bold leading-[33px]">
                  Employees
                </h2>
                <div className="w-full sm:w-auto">
                  <Dropdown
                    placeholder="March 2023"
                    options={monthOptions}
                    onSelect={handleMonthSelect}
                    rightImage={{
                      src: '/images/img_arrowdown.svg',
                      width: 14,
                      height: 16,
                    }}
                    className="sm:w-[180px]"
                  />
                </div>
              </div>

              <div className="bg-global-4 rounded-[14px] p-1 overflow-hidden">
                <div className="flex items-start gap-8 sm:gap-12 px-4 pt-4 pb-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative pb-2 ${
                        activeTab === tab ? 'text-global-3 font-bold' : 'text-global-2 font-medium'
                      } text-sm sm:text-[15px] leading-[19px] transition-colors duration-200`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(124deg,#6d38e0_0%,#ff5e35_100%)] rounded-[1px]"></div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="h-[1px] bg-global-5 mx-4"></div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-table-1 rounded-[6px]">
                        <th className="text-left text-global-2 text-[13px] font-medium leading-[17px] p-3 sm:p-4">
                          EMPLOYEE ID
                        </th>
                        <th className="text-left text-global-2 text-[13px] font-medium leading-[17px] p-3 sm:p-4">
                          RISK RATING
                        </th>
                        <th className="text-left text-global-2 text-[13px] font-medium leading-[17px] p-3 sm:p-4">
                          HIGHLIGHT
                        </th>
                        <th className="text-left text-global-2 text-[13px] font-medium leading-[17px] p-3 sm:p-4">
                          DATE & TIME
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {flaggedMessages.map((msg, idx) => (
                        <tr
                          key={msg.employee_id}
                          className={
                            idx !== flaggedMessages.length - 1 ? 'border-b border-global-5' : ''
                          }
                        >
                          <td className="p-3 sm:p-4">
                            <span className="text-global-3 text-sm sm:text-[15px] font-medium leading-[19px]">
                              {msg.employee_id}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={'/images/img_star.svg'}
                                alt="star"
                                className="w-[14px] h-[14px]"
                              />
                              <span className="text-global-3 text-sm sm:text-[15px] font-medium leading-[19px]">
                                {msg.risk_score}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4">
                            <span className="text-global-3 text-sm sm:text-[15px] font-medium leading-[19px]">
                              {msg.highlights.join(', ')}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4">
                            <span className="text-global-3 text-sm sm:text-[15px] font-medium leading-[19px]">
                              {new Date(msg.timestamp).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-global-4 text-lg sm:text-[20px] font-bold leading-[24px] font-lato">
                © 2025 Team Codeplay. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
