import os
from flask import Flask, flash, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import pandas as pd
import numpy as np


## to be made into a package
def makeGraphData (df, x_axis, y_axis,x_axisModification, y_axisModification, graphType) :
  print(y_axisModification)
  if graphType == "Bar Graph":
   
    if y_axisModification == "" or y_axisModification == "Sum":
      grouped_df =df.groupby(x_axis)[y_axis].sum().reset_index()
    elif y_axisModification == "Count":
      grouped_df =df.groupby(x_axis)[y_axis].count().reset_index()
    elif y_axisModification == "Average":
      grouped_df =df.groupby(x_axis)[y_axis].mean().reset_index()
    else:
      grouped_df =df.groupby(x_axis)[y_axis].sum().reset_index()
    grouped_df = grouped_df.rename(index={0: x_axis, 1:y_axis})
    return jsonify( data_labels= grouped_df[x_axis].tolist(), chart_data = grouped_df[y_axis].tolist()  )
##


app = Flask(__name__)
UPLOAD_FOLDER = 'FileUploads'
ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls', 'txt', 'xlsb'}
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return "hello"
    
@app.route('/uploadFile', methods=['GET', 'POST'])
def uploadFile():
    if request.method == 'POST':
        # check if the post request has the file part
       
        if 'file' not in request.files:
            flash('No file part')
            return {"message" : "file upload unsuccessful"}
        file = request.files['file']
        filename=file.filename
        #if user does not select file, browser also
        # submit an empty part without filename
        if filename == '':          
            return {"message":"error: file does not have a name"}
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
           
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            return  {"message":"upload was a success"}
    elif request.method =="GET" :
       filename= request.data.filename      
       return redirect(url_for('uploaded_file', filename=filename) )
   



@app.route('/data', methods=["POST"])

def getData():
    data= request.json
    filename = data["filename"]
    filename = filename.replace(" ", "_")
    df=pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'],filename))
    df=df.replace({np.nan: None})
    session["data"]=df
    res = df.dtypes.to_frame('dtypes').reset_index()
    dataTypes = res.set_index('index')['dtypes'].astype(str).to_dict()   
    df = df.to_dict(orient='records')
    returnObject ={"data":df, "types":dataTypes}
    return returnObject
    


      
  
if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(threaded=True, port=5000)# debug=True restarts the server everytime we make a change in our code,
    
