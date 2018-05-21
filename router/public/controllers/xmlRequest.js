function requestData (url, arg, method, callback) 
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => 
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            content = xhr.responseText;
            if (content != '' && (content))
            {
                //console.log("CONTENT : ", content)
                callback(JSON.parse(content));
            }
            else
                callback(false);
        }
    }
    xhr.open(method, url + arg, true);
    if (method == 'POST' && this.dataPost)
        xhr.send(this.dataPost);
    else
         xhr.send(null);
}


function getData(arg, url, method, callback) 
{
    requestData(arg, url, method, (data) =>
    {
        if (data !== false)
            callback(data);
        else
            callback(false);
    });
}