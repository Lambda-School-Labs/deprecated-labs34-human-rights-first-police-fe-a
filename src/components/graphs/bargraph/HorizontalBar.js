import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const Horizontalbar = () => {
  // const [noPresence, setNoPresence] = useState();
  const [policePresence, setPolicePresence] = useState();
  const [emptyHand, setEmptyHand] = useState();
  const [bluntForce, setBluntForce] = useState();
  const [chemicalElectric, setChemicalElectric] = useState();
  const [lethalForce, setLethalForce] = useState();

  const dataList = useSelector(state => Object.values(state.incident.data));

  const data = {
    labels: [
      'Rank 2 - Empty-hand',
      'Rank 3 - Blunt Force',
      'Rank 4 - Chemical & Electric',
      'Rank 5 - Lethal Force',
    ],
    datasets: [
      {
        label: 'Number of Incidents',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [emptyHand, bluntForce, chemicalElectric, lethalForce],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          //stacked and begin at zero must be 'true' for bar graph to start at 0
          stacked: true,
          beginAtZero: true,
          scaleLabel: {
            fontSize: 14,
            lineHeight: 2,
            display: true,
            labelString: 'Number of Incidents',
          },
          ticks: {
            autoSkip: false,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const emptyHandTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 2 - Empty-hand';
    }).length;
    setEmptyHand(emptyHandTotal);

    const bluntForceTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 3 - Blunt Force';
    }).length;
    setBluntForce(bluntForceTotal);

    const chemicalElectricTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 4 - Chemical & Electric';
    }).length;
    setChemicalElectric(chemicalElectricTotal);

    const lethalforceMethodsTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 5 - Lethal Force';
    }).length;
    setLethalForce(lethalforceMethodsTotal);
  }, [dataList]);

  return (
    <div>
      <div className="home-bar-graph">
        <h1>Incidents Grouped by Level of Police Force</h1>
        <p>
          This graph is intended to provide an at-a-glance understanding of the
          types and volume of incidents that are being cataloged.
        </p>
        <h3>Graph Legend</h3>
        <p className="graph-legend-wrap">
          <li>
            Rank 1{/* Officer Presence   -- removed due to too much in legend*/}
            — Police are present, but no force detected. This is not shown on
            the graph.
          </li>
          <li>
            Rank 2{/* Empty-Hand    -- removed due to too much in legend*/}—
            Officers use bodily force to gain control of a situation. Officers
            may use grabs, holds, joint locks, punches and kicks to restrain an
            individual.
          </li>
          <li>
            Rank 3
            {/* Blunt Force Methods    -- removed due to too much in legend*/}—
            Officers use less-lethal technologies to gain control of a
            situation. Baton or projectile may be used to immobilize a combative
            person for example.
          </li>
          <li>
            Rank 4
            {/* Chemical & Electric    -- removed due to too much in legend*/}—
            Officers use less-lethal technologies to gain control of a
            situation, such as chemical sprays, projectiles embedded with
            chemicals, or tasers to restrain an individual.
          </li>
          <li>
            Rank 5{/* Lethal Force    -- removed due to too much in legend*/}—
            Officers use lethal weapons to gain control of a situation.
          </li>
          <br />
          <p className="graph-disclaimer">
            Note: This graph relies on open source data from multiple sources
            and a machine learning model that is still in beta. These categories
            may not accurately represent the circumstances of each incident.{' '}
          </p>
        </p>
        <HorizontalBar
          style={{ width: '100%', height: '450px' }}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default Horizontalbar;
