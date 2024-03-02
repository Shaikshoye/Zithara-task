import { useState, useEffect } from "react";
import { get } from "./IO";
import TableComponent from "./TableComponent"; 
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [onupdateData, setOnUpdateDate] = useState(false);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    get().then((data) => {
      console.log(data);
      var finalData = data.map((item) => ({
        ...item,
        Date: new Date(item.createdAt).toLocaleDateString(),
        Time: new Date(item.createdAt).toLocaleTimeString(),
      }));
      setData(finalData);
    });
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);

   
    handleSearch(inputValue);
  };

  const handleSearch = (query) => {
    console.log("search query", query);
    const lowerCaseQuery = query.toLowerCase().trim();

    if (lowerCaseQuery.length === 0) {
      get().then((originalData) => {
        const updatedData = originalData.map((item) => ({
          ...item,
          Date: new Date(item.createdAt).toLocaleDateString(),
          Time: new Date(item.createdAt).toLocaleTimeString(),
        }));
        setData(updatedData);
        setOnUpdateDate(!onupdateData);
      });
    } else {
      const regex = new RegExp(`^${lowerCaseQuery}`, "i");

      const filteredResults = data.filter(
        (item) =>
          regex.test(item.customer_name.toLowerCase()) ||
          regex.test(item.location.toLowerCase())
      );

      setData(filteredResults);
      setOnUpdateDate(!onupdateData);
    }
  };

  //Modifying Table Data

  const sortDataOnDate = () => {
    const sortedData = data.sort((a, b) => {
      console.log("Wjay", a, b);
      const dateA = new Date(a.createdAt); 
      const dateB = new Date(b.createdAt); 

      return dateA - dateB;
    });

    console.log("sorted data", sortedData);
    console.log("final Data", data);
    setData(sortedData);
    setOnUpdateDate(true);
  };

  return (
    <div>
      <div>
        <h1 style={Styles.headerStyle}>Zithara Technologies</h1>
      </div>
      <div id="mainDiv" style={{ display: "flex", flexDirection: "row" }}>
        <div
          id="profileDiv"
          style={{
            width: "20%",
            borderWidth: 3,
            borderColor: "black",
            borderStyle: "solid",
            borderRadius: 20,
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingInline: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFBE98",
              height: 55,
              padding: 7,
              width: 150,
              display: "flex",
              justifyContent: "center",
              borderRadius: 30,
              borderWidth: 2,
              borderStyle: "solid",
              marginTop: 25,
            }}
          >
            <label
              style={{
                fontFamily: "serif", 
                fontSize: 40, 
                color: "black",
              }}
            >
              About
            </label>
          </div>
          <p>
            Welcome to our company's website, your gateway to seamless customer
            experiences. At the heart of our digital presence lies a robust
            platform designed to securely store and manage customer details. Our
            user-friendly interface ensures effortless navigation, allowing
            clients to update and access their information effortlessly. With a
            commitment to privacy and data security, we employ cutting-edge
            technologies to safeguard customer data. Explore our site for a
            glimpse into the future of personalized services, where trust and
            innovation converge. Join us on this journey of connectivity, where
            every detail matters, and customer satisfaction is our paramount
            goal.
          </p>

          <div
            style={{
              marginTop: 345,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e65c00",
              borderRadius: 10,
              borderStyle: "solid",
              borderWidth: 3,
              borderColor: "black",
              width: 300,
            }}
          >
            <p style={{ textAlign: "center" }}>
              address: Hyderabad <br /> email: zithara@gmail.com <br />
              phone: (615)555-9999
            </p>
          </div>
        </div>

        <div style={{ width: "80%", paddingLeft: 10 }}>
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <input
              value={searchQuery}
              style={Styles.searchBar}
              placeholder="search with name or location"
              onChange={handleInputChange}
              fontColor="black"
            ></input>
            <div onClick={handleSearch} style={Styles.searchBox}>
              <SearchIcon fontSize="large" />
            </div>

            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="dropdown"
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ width: 250 }}
                fontColor="black"
              >
                <MenuItem value="option1" onClick={sortDataOnDate}>
                  Date
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TableComponent
              key={onupdateData ? "refreshKey" : "defaultKey"}
              data={data}
              onUpdate={() => setOnUpdateDate(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Styles = {
  headerStyle: {
    backgroundColor: "#e65c00",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "70px",
  },
  searchBar: {
    width: "180%",
    height: 45,
    // color:"white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 10,
    marginRight: 10,
    padding: 5,
    fontSize: 20,
  },
  searchBox: {
    padding: "2px 4px",
    backgroundColor: "#35374B",
    color: "white",
    border: "none",
    borderRadius: "4px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "60%",
    alignSelf: "center",
    marginLeft: -65,
    marginRight: 30,
  },
};
export default App;
