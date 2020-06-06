$(document).ready(function()
{
    // $('[data-toggle="tooltip"]').tooltip();
    
    $('#mycarousel').carousel( { interval: 2000 } );

    // $('#carousel-pause').click(function(){
    //     $('#mycarousel').carousel('pause');
    // });

    $('#carousel-toggle').click(function()
    {
        if ($('#carousel-toggle').children('span').hasClass('fa-pause'))
        {
            $('#mycarousel').carousel('pause');
            $('#carousel-toggle').children('span').removeClass('fa-pause');
            $('#carousel-toggle').children('span').addClass('fa-play');
        }
        else if ($('#carousel-toggle').children('span').hasClass('fa-play'))
        {
            $('#mycarousel').carousel('cycle');
            $('#carousel-toggle').children('span').removeClass('fa-play');
            $('#carousel-toggle').children('span').addClass('fa-pause');
        }
    });
});

$('#loginModalBtn').click(function()
{
    $('#loginModal').modal('show');
});

$('#ReserveTableBtn').click(function()
{
    $('#restabModal').modal('show');
});