# woord_tree
Tool designed to make searching for scholarly articles faster and more accurate.

Known Issues:

1. Changing the node trys to retrigger the map as you are typingbecause of handleinputchange, causing errors. 

2. No message to notify you if your search of results turns up nothing because of a typo, display area just remains empty


Future Plans:

1. Separate article display into component, have it set to display if true.

2. Spinner for async on createTreeData

3. Control of initial search results max/offset, I think offset might be better because it gets very slow over 30 results.

4. UI/UX improvements.