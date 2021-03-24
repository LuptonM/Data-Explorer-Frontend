def makeGraphData (dataframe, x_axis, y_axis, graphType) :

  if graphType == "Bar Graph":
    grouped_df =df.groupby(x_axis)[y_axis].sum().reset_index()
    grouped_df = grouped_df.rename(index={0: x_axis, 1:y_axis})
    return jsonify( data_labels= grouped_df[x_axis].tolist(), chart_data = grouped_df[y_axis].tolist()  )