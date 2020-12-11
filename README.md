# barcQ
A repository to share ideas related to Quantum computing, and code to implement Quantum Algorithms

To launch the application to just view the frontend, open the **frontend/GridInterface/samples/gridSkeleton.html** file in the chrome browser

Here you can create the quantum circuit.

To see the complete thing in action, you need to install following pacakges  
1) **CherryPy** framework (To receive the data at the backend)  
2) **QuTiP** (To Process the quantum circuit)  

Once **QuTip** and **CherryPy** is installed then run the **backend/cherryPyWork/pythonBackend.py** python file.
This will start the webserver at port 8000 of localhost, and now it can process the circuit using
the QuTiP in the backend.

****************************************************************************************************
This version was released for user group.

One feature was added: Save circuit button to save the circuit in user's machine

One feature was modified: Load button was changed to load an already saved circuit

Features removed: Few buttons were removed or deactivated as their functionalities were redundant.

All the modifications were done in index.html

New JS files were added for new and modified features.
