
setTimeout(()=>{
    $.ajax({
        url:'/user.action',
        method:'get',
        success:function (data) {
            $('#root').html(data)
        },
        error:function (error) {
            console.log(error)
        }
    })

    $.ajax({
        url:'/list.action',
        method:'post',
        data:JSON.stringify(['aaa','bbb']),
        success:function (data) {
            console.log(data)
            $('#root2').html(data)
        },
        error:function (error) {
            console.log(error)
        }
    })
},1000)