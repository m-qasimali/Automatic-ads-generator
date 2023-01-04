import React, { useState } from 'react'
import "./DashboardPages.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { BarChart } from '@mui/icons-material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





const DashboardHome = () => {
  const [active, setActive] = useState({
    'year': true,
    'month': false,
    'week': false,
  });
  const [active1, setActive1] = useState({
    'year': true,
    'month': false,
    'week': false,
  });
  const [visitors, setVisitors] = useState("11,500");
  const [cost, setCost] = useState("29,400");

  const [calendar, setCalendar] = useState("year");
  const [calendar1, setCalendar1] = useState("year");

  const handleChart = (name) => {
    setActive((prev) => {
      let temp = { ...prev };
      if (name === 'year') {
        temp.year = true;
        setVisitors("11,500");
      }
      else {
        temp.year = false;
      }

      if (name === 'month') {
        temp.month = true;
        setVisitors("9,500");
      }
      else {
        temp.month = false;
      }

      if (name === 'week') {
        temp.week = true;
        setVisitors("4,500");
      }
      else {
        temp.week = false;
      }

      return temp;
    })
    setCalendar(name);
  }

  const handleChart1 = (name) => {
    setActive1((prev) => {
      let temp = { ...prev };
      if (name === 'year') {
        temp.year = true;
        setCost("29,400");
      }
      else {
        temp.year = false;
      }

      if (name === 'month') {
        temp.month = true;
        setCost("8,300");
      }
      else {
        temp.month = false;
      }

      if (name === 'week') {
        temp.week = true;
        setCost("2,700");
      }
      else {
        temp.week = false;
      }

      return temp;
    })
    setCalendar1(name);
  }

  const years = ["2018", "2019", "2020", "2021", "2022", "2023"];
  const data1 = {
    labels: years,
    datasets: [
      {
        label: "Male",
        backgroundColor: "rgba(30, 11, 166, 0.7)",
        borderColor: "rgba(30, 11, 166, 0.7)",
        data: [1500, 1200, 700, 900, 1200, 2000],
      },
      {
        label: "Female",
        backgroundColor: "#9DA5D8",
        borderColor: "#9DA5D8",
        data: [1200, 1000, 500, 700, 800, 1000],
      },
    ],
  };

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const data2 = {
    labels: months,
    datasets: [
      {
        label: "Male",
        backgroundColor: "rgba(30, 11, 166, 0.7)",
        borderColor: "rgba(30, 11, 166, 0.7)",
        data: [1500, 1200, 700, 900, 1200, 2000, 1000, 1500, 500, 1200, 800, 1100],
      },
      {
        label: "Female",
        backgroundColor: "#9DA5D8",
        borderColor: "#9DA5D8",
        data: [1200, 1000, 500, 700, 800, 1000, 1200, 900, 1200, 600, 600, 900],
      },
    ],
  };

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const data3 = {
    labels: days,
    datasets: [
      {
        label: "Male",
        backgroundColor: "rgba(30, 11, 166, 0.7)",
        borderColor: "rgba(30, 11, 166, 0.7)",
        data: [700, 600, 700, 900, 400, 300, 800],
      },
      {
        label: "Female",
        backgroundColor: "#9DA5D8",
        borderColor: "#9DA5D8",
        data: [500, 700, 500, 400, 700, 800, 300],
      },
    ],
  };


  const years1 = ["2018", "2019", "2020", "2021", "2022", "2023"];
  const data4 = {
    labels: years1,
    datasets: [
      {
        label: "Dollars",
        backgroundColor: "rgba(30, 11, 166, 0.7)",
        borderColor: "rgba(30, 11, 166, 0.7)",
        data: [500, 300, 400, 200, 300, 100],
      }
    ],
  };

  const months1 = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const data5 = {
    labels: months1,
    datasets: [
      {
        label: "Dollars",
        backgroundColor: "rgba(30, 11, 166, 0.7)",
        borderColor: "rgba(30, 11, 166, 0.7)",
        data: [500, 100, 200, 300, 200, 200, 100, 300, 400, 500, 400, 100],
      },
    ],
  };

  const days1 = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const data6 = {
    labels: days,
    datasets: [
      {
        label: "Dollars",
        backgroundColor: "rgba(30, 11, 166, 0.7)",
        borderColor: "rgba(30, 11, 166, 0.7)",
        data: [500, 300, 200, 300, 400, 300, 200],
      }
    ],
  };


  let delayed;
  const options = {
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        enabled: true
      }
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 500 + context.datasetIndex * 50;
        }
        return delay;
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const getChart = (cal) => {
    switch (cal) {
      case 'year': { return <Bar data={data1} options={options} /> }
      case 'month': { return <Bar data={data2} options={options} /> }
      case 'week': { return <Bar data={data3} options={options} /> }
    }
  }

  const getChart1 = (cal) => {
    switch (cal) {
      case 'year': { return <Bar data={data4} options={options} /> }
      case 'month': { return <Bar data={data5} options={options} /> }
      case 'week': { return <Bar data={data6} options={options} /> }
    }
  }

  return (

    <>
      <div className='portion-header'>
        <p className='portion-title'>Overview</p>
        <MoreVertIcon fontSize='large' className='portion-icon' />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <img className='card-size' src="./images/card1.svg" alt="" />
        </Grid>
        <Grid item xs={12} md={3}>
          <img className='card-size' src="./images/card2.svg" alt="" />
        </Grid>
        <Grid item xs={12} md={3}>
          <img className='card-size' src="./images/card3.svg" alt="" />
        </Grid>
        <Grid item xs={12} md={3}>
          <img className='card-size' src="./images/card4.svg" alt="" />
        </Grid>
      </Grid>

      <div className='portion-header'>
        <p className='portion-title'>Ads Mangement</p>
        <MoreVertIcon fontSize='large' className='portion-icon' />
      </div>

      <div style={{ backgroundColor: "#fff" }} className='chart-style'>
        <div className='ads-container'>
          <div className='ads-schedule'>
            <p name="year" onClick={() => handleChart("year")} className={active.year ? 'active' : 'p-color'}>YEAR</p>
            <p name="month" onClick={() => handleChart("month")} className={active.month ? 'active' : 'p-color'}>MONTH</p>
            <p name="week" onClick={() => handleChart("week")} className={active.week ? 'active' : 'p-color'}>WEEK</p>
          </div>
          <div className='total-visitor'>
            Total visits : <span>{visitors}</span>
          </div>
        </div>

        {
          getChart(calendar)
        }

      </div>

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <div className='portion-header'>
            <p className='portion-title'>Total Referals</p>
            <MoreVertIcon fontSize='large' className='portion-icon' />
          </div>

          <div className='totalReferals'>
            <div className='referal'>
              <div className='sub-referal'>
                <img className='referal-icon' src="./images/instagram.svg" />
                <p>Instagram</p>
              </div>
              <div>
                12,300
              </div>
            </div>
            <div className='referal'>
              <div className='sub-referal'>
                <img className='referal-icon' src="./images/facebook.svg" />
                <p>Facebook</p>
              </div>
              <div>
                25,800
              </div>
            </div>
            <div className='referal'>
              <div className='sub-referal'>
                <img className='referal-icon' src="./images/tiktok.svg" />
                <p>Tiktok</p>
              </div>
              <div>
                35,300
              </div>
            </div>

            <div className='referal'>
              <div className='sub-referal'>
                <img className='referal-icon' src="./images/youtube.svg" />
                <p>Youtube</p>
              </div>
              <div>
                65,800
              </div>
            </div>

            <div className='referal'>
              <div className='sub-referal'>
                <img className='referal-icon' src="./images/pinterest.svg" />
                <p>Pinteres</p>
              </div>
              <div>
                65,200
              </div>
            </div>

            <div className='referal'>
              <div className='sub-referal'>
                <img className='referal-icon' src="./images/linkedin.svg" />
                <p>Linkedin</p>
              </div>
              <div>
                39,200
              </div>
            </div>

          </div>

        </Grid>

        <Grid item md={6} xs={12}>
          <div className='portion-header'>
            <p className='portion-title'>Advertiser Cost</p>
            <MoreVertIcon fontSize='large' className='portion-icon' />
          </div>

          <div style={{ backgroundColor: "#fff", height: "320px", width: "100%" }} className='chart-style'>
            <div className='ads-container'>
              <div className='ads-schedule'>
                <p name="year" onClick={() => handleChart1("year")} className={active1.year ? 'active1' : 'p-color1'}>YEAR</p>
                <p name="month" onClick={() => handleChart1("month")} className={active1.month ? 'active1' : 'p-color1'}>MONTH</p>
                <p name="week" onClick={() => handleChart1("week")} className={active1.week ? 'active1' : 'p-color1'}>WEEK</p>
              </div>
              <div className='total-cost'>
                Total cost : <span>{cost}</span>
              </div>
            </div>

            {
              getChart1(calendar1)
            }

          </div>

        </Grid>
      </Grid>
    </>
  )
}

export default DashboardHome