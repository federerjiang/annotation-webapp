# Steps to build the web app for MNC name labeling 

1. Step-1: start the database: `sh start_db.sh` 
2. Step-2: initialize the database with selected names and user info: `cd dbinit; sh init_db.sh`
3. Step-3: run the backend server: `cd backend; sh start_server.sh`
4. Step-4: 
	- Local dev :run the frontend server locally: `cd frontend; sh start_react_local.sh`
	- Deployment to server: refer `frontend/README.md`