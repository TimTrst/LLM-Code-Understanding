import React, {useState, useEffect} from 'react'
import Ide from "./IDE/Ide"
import Sidebar from "./Sidebar/Sidebar"
import Output from "./Output/Output"
import "./App.css"
import {Container, Typography} from "@mui/material";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/index');
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
          const result = await response.json();
          setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="App">
            <Sidebar/>
            <h1>Fetched Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Typography variant="h1" sx={{my: 4, textAlign: 'center', color: "primary.main"}}>Coder
                Understanding</Typography>
            <Container>
                <Ide/>
                <Output/>
            </Container>
        </div>
    );
}

export default App;
