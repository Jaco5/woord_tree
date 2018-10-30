
import { Input, FormBtn } from "../../Components/Form";
import React, { Component, Fragment } from "react";
import API from "../../Utils/API";
import { Chart } from "react-google-charts";

let  options = {};

class Tree extends Component { //Tree page is the main app.
    state = {
        results: [], // Initial search results from doaj.org
        treeData: [],  // Array of single index arrays of strings created from search result abstracts.
        node: "",  // Node word of the word tree chart.
        phrase: "", // Search term for api to doaj.
        relevant: "",  // The phrase to search your search results for.
        relevantResult: { // The title and href of the article containing the phrase.
            title: "",
            link: ""
        }
    }


    APIsearch = () => { // The first step is to search doaj.org
        // this.setState({ treeData: [] })
        API.searchAPI(this.state.phrase)
            .then(async result => { // Use of ASYNC AWAIT is to deal with the time delay on setState, may be able to eliminate this by using MOBX
                console.log("RESULT: ", result);
                await this.setState({ results: result.data.results })
                console.log("hi wait")
                this.createTreeData() // Here we call the method to create the treeData
            }).catch(e => console.log(e));;
    }

    createTreeData = () => {
        let bigArray = [] // To avoid mutating state.
        for (var i = 0; i < this.state.results.length; i++) { // For each result
            if (this.state.results[i].bibjson.abstract && this.state.results[i].bibjson.abstract != ".") { // Many results have null or "." in their abstract key, don't include these.
                let singleArray = [this.state.results[i].bibjson.abstract]; // Package the string in an array before pushing it.
                // console.log(singleArray);
                bigArray.push(singleArray); // Ah, push it.
            }
        }
        console.log("big" + bigArray);
        console.log(this.state.results)
        this.state.results.map(result => { // I no longer remember why this is in a state.results.map
            this.setState({ treeData: bigArray });
        });

        setTimeout(() => {
            console.log(this.state)
        }, 5000);


    }

    relevantAbstracts = (event) => { // Call this on click after you have entered a phrase to locate the abstract your phrase is from.
        event.preventDefault();
        const thisArticle = this.state.results.filter(article => article.bibjson.abstract && article.bibjson.abstract.includes(this.state.relevant)); // If the article has an abstract and that abstract includes state.phrase
        if (thisArticle[0]) {
        this.setState({
            relevantResult: {
                title: thisArticle[0].bibjson.title ? thisArticle[0].bibjson.title : "Title not found.",
                link: thisArticle[0].bibjson.link[0].url ? thisArticle[0].bibjson.link[0].url : "Link not found.",
                year: thisArticle[0].bibjson.year ? thisArticle[0].bibjson.year : "Year not found.",
                journal: thisArticle[0].bibjson.journal.title ? thisArticle[0].bibjson.journal.title : "Journal not found.",
                publisher: thisArticle[0].bibjson.journal.publisher ? thisArticle[0].bibjson.journal.publisher : "Publisher not found.",
                subject: thisArticle[0].bibjson.subject[0].term ? thisArticle[0].bibjson.subject[0].term : "Subject not found.",
                abstract: thisArticle[0].bibjson.abstract
                // add: the other deets, display below?
            }
        })}
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    
    handleAPI = event => {
        event.preventDefault();
        if (this.state.phrase) {
            this.APIsearch(this.state.phrase);
        };
    };


    render() {
        return (
            <Fragment>
                <form className={"col-6"}>
                    
                    <h3>Enter your search term here:</h3>
                    <Input
                        value={this.state.phrase}
                        onChange={this.handleInputChange}
                        name="phrase"
                        placeholder="search term (required)"
                    />
                    <FormBtn
                        disabled={!(this.state.phrase)}
                        onClick={this.handleAPI}
                    >
                        Search
                    </FormBtn>

                    <h3>Use this field to set the tree's node:(case sensitive)</h3>
                    <Input
                        value={this.state.node}
                        onChange={this.handleInputChange}
                        name="node"
                        placeholder="NODE" //this needs to be set to a button
                    />

                    <h3>Use this field to locate a specific article:(case sensitive)</h3>
                    <Input
                        value={this.state.relevant}
                        onChange={this.handleInputChange}
                        name="relevant"
                        placeholder="Find Specific Article"
                    />
                    <FormBtn
                        disabled={!(this.state.relevant)}
                        onClick={this.relevantAbstracts}
                    >
                        Find
                    </FormBtn>
                </form>
                <br></br>
                {/* Need a ternary in here on treeData */}
                <div className={"my-pretty-chart-container"}> 
                    <Chart
                        chartType="WordTree"
                        data={this.state.treeData}
                        width="100%"
                        height="600px"
                        options={options = {
                            wordtree: {
                                format: "implicit",
                                type: "double",
                                word: this.state.node 
                            }
                        }
                        }
                        legendToggle
                    />
                </div>
                <div className={"col-6"}>
                    <h3>This is your article!</h3>
                    <ul>
                        <li>{this.state.relevantResult.title}</li>
                        <li>{this.state.relevantResult.link}</li>
                        <li>{this.state.relevantResult.year}</li>
                        <li>{this.state.relevantResult.journal}</li>
                        <li>{this.state.relevantResult.publisher}</li>
                        <li>{this.state.relevantResult.subject}</li>
                        <li>{this.state.relevantResult.abstract}</li>
                    </ul>
                    <button onClick={this.handleSaveBtn}>Save</button>
                </div>

                <div id="wordtree_basic" style={{ width: 100 + '%', height: 650 + "px" }}></div>
            </Fragment>
        )
    };
};

export default Tree;