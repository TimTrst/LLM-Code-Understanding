import React, {useState, useEffect} from 'react'

function App() {

    const [data, setData] = useState({
        project: "",
        date: "",
        backend: "",
        frontend: ""
    })

    useEffect(() => {
        fetch("/index").then((res) => {
            res.json().then((data) => {
                setData(
                    {
                        project: data.Project,
                        date: data.Date,
                        backend: data.Backend,
                        frontend: data.Frontend
                    }
                )
            })
        })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <h1>React and Flask</h1>
                <p>{data.project}</p>
                <p>{data.date}</p>
                <p>{data.backend}</p>
                <p>{data.frontend}</p>
            </header>
        </div>
    );
}

export default App;
