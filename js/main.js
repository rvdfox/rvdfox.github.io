var scrolled = 0;
var orig_width = 0;

function onLoad(){
	$('body').scrollTop(0);
	var hgt = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	$('.modal').modal();
	$("area").each(function() { $(this).attr('data-coords', $(this).attr('coords')) });
	mapResize();

	$('#getStartMapId').on('click',function() {
		console.log('click');
		$('html').animate({
            scrollTop: hgt
        });
	})

	$('.getStartedBtnSmall').on('click',function() {
		console.log('click');
		$('html').scrollTo('.buttonPlaceholder');
    })

	if(navigator.userAgent.includes('Mobile'))
	{

		$('.downloadSection').show();
		$('.consentSection').show();
		$('.buttonText').hide();

		$('.iosDownload').click(function() {
			console.log('download for ios');
			var checked = $('#consentCheck').is(":checked");
			if(!checked)
			{
				alert('Please accept the User Terms and Privacy Policy');
				return;
			}
			window.open('ios.html','_self');
		});

		$('.androidDownload').click(function(){
			console.log('download for android');
			var checked = $('#consentCheck').is(":checked");
			if(!checked)
			{
				alert('Please accept the User Terms and Privacy Policy');
				return;
			}
			window.open('android.html','_self');
		});
	}
	else
	{
		$('.arrow').show();
	}
}

function mapResize() {
	$("map").each(function() {
    var img = $("img[usemap='#getStartedMap']");

    if (img[0].naturalWidth) {
      	widthchange = img.width() / img[0].naturalWidth;
    }
    else {
      	widthchange = 1;
      	setTimeout(mapResize, 1000);
    }

    if(img[0].naturalHeight) {
    	heightchange = img.height() / img[0].naturalHeight;
    }
    else {
    	heightchange = 1;
      	setTimeout(mapResize, 1000);
	}

    $("area").each(function() {
      	var pairs = $(this).attr("data-coords").split(', ');
      	console.log('pairs',pairs);
      	for(var i=0; i<pairs.length; i++) {
          var nums = pairs[i].split(',');
          console.log('nums',nums);
          	for(var j=0; j<nums.length; j+=2) {
              	nums[j] = parseFloat(nums[j]) * widthchange;
              	nums[j+1] = parseFloat(nums[j+1]) * heightchange;
          	}
          	pairs[i] = nums.join(',');
      	}
      	$(this).attr("coords", pairs.join(', '));
      	console.log('new pair',pairs.join(', '));
    });
  });
}

function scrollSection() {
}

function iosLoad() {
  $('.modal').modal();
}

function androidLoad() {
  $('.modal').modal();
}

function submitEmail(){
	console.log('submitting email to check');
	if($('.emailInput').val()=='')
	{
		alert('Cannot submit empty value');
		return;
	}
	$.ajax({
		type:'POST',
		crossDomain: true,
		url:'http://prototypeweb.pdvrdkmq3d.us-west-2.elasticbeanstalk.com/PrototypeWebServlet',
		headers:{
			"Authorization":"Basic TW9iaWxlQXBwOlNXNWplWEJvWVdWU1pYTnZibVZoUkhKdmQzcHNaUT09",
			"AuthorizationType":"Register",
			"Content-Type":"application/json"
		},
		dataType:'json',
		data:{
			"interfaceName":"clientEmployee",
			"methodName":"checkClientEmployee",
			"requestInfo":
			{
					"employeeIdentifier":$('.emailInput').val()
			}
		},
		success:function(data) {
			console.log('success request ',data);
		}
	})
}

function iosDownloadFn(){
	console.log('Download ios');
	$('#iosModal').modal('open');
// 	alert('Depending upon your connection, the download may take up to a minute or more. Please check the home screen on your phone for the DROWZLE installation status');
// 	window.open('itms-services://?action=download-manifest&url=https%3A%2F%2Fna01ws.apperian.com%2Fdownloads%2Finstall%2Fapplications%2F74984%2Fno_auth%2F%3Fcapp%3DbaWEm-uDz_3Y-dPW2U1tgw','_self');
}

function androidDownloadFn(){
	console.log('Download ios');
	$('#androidModal').modal('open');
// alert('Depending upon your connection, the download may take up to a minute or more. Please check the downloads folder on your phone or scroll down notification bar and tap on the APK file for installation');
// 	window.open('https://na01ws.apperian.com/downloads/install/applications/74981/no_auth/?capp=N4RboXhzwrta0L9ejC6x9w','_self');
}