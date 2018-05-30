/**
 * Created by mobiu on 2016/11/15.
 */

function PolicyLoader() {
    var strTitle = document.getElementById("strFCTitle").value;
    var strSurname = document.getElementById("strFCSurname").value;
    var strFullnames = document.getElementById("strFCFullnames").value;
    var strIDNumber = document.getElementById("strFCIDNumber").value;
    var strPassportNum = document.getElementById("strPassportNumber").value;
    var strDateofBirth = document.getElementById("strFCDateofBirth").value;
    var strNationality = document.getElementById("strFCNationality").value;

    var strResidentiall1 = document.getElementById("strFCResidential1").value;
    var strResidential2 = document.getElementById("strFCResidential2").value;
    var strResCountry = document.getElementById("strFCResidentialCountry").value;
    var strResProvince = document.getElementById("strFCResidentialProvince").value;
    var strResPostalCode = document.getElementById("strFCResidentialPostalCode").value;




    var strPostAddressL1 = document.getElementById("strFCPostalAddress1").value;
    var strPostAddressL2 = document.getElementsById("strFCPostalAddress2").value;
    var strPostalCountry = document.getElementsById("strFCPostalCountry").value;
    var strPostalProvince = document.getElementsById("strFCPostalProvince").value;
    var strPostalCode = document.getElementsById("strFCPostalCode").value;

    var strDayTimeNumber = document.getElementsById("strDayTimeNumber").value;
    var strCellNumber = document.getElementById("strCellNumber").value;
    var strEmail = document.getElementById("strEmail").value;




    // Returns successful data submission message when the entered information is stored in database.
    var dataString = 'vstrTitle=' + strTitle + '&vstrSurname=' + strSurname + '&vstrFullnames=' + strFullnames + '&vstrIDNumber=' + strIDNumber  + 'vstrPassportNum=' + strPassportNum + 'vstrDateofBirth=' + strDateofBirth + 'vstrNationality=' + strNationality  + 'vstrResidentiall1=' + strResidentiall1 +  'vstrResidential2=' + strResidential2 + 'vstrResCountry=' + strResCountry + 'vstrResProvince=' + strResProvince + 'vstrResPostalCode='+ strResPostalCode + 'vstrPostAddressL1=' + strPostAddressL1 +  'vstrPostAddressL2=' + strPostAddressL2 + 'vstrPostalCountry='+ strPostalCountry + 'vstrPostalProvince='+ strPostalProvince + 'vstrPostalCode=' + strPostalCode + 'vstrPostalCode=' + strPostalCode +  'vstrDayTimeNumber=' + strDayTimeNumber + 'vstrCellNumber=' + strCellNumber + 'vstrEmail=' + strEmail;
    if (strSurname == '' || strFullnames == '' || strIDNumber == '' || strCellNumber == '' || strEmail =='' ) {
            alert("Please Fill All Fields");
        } else {
                    alert("Form About to be Submitted")
                    // AJAX code to submit form.
                    $.ajax({
                    type: "post",
                    url: "/dynamic/funeralpolicy/PolicyHolder.html",
                    data: dataString,
                    cache: false,
                    success: function(html) {
                        html.preventDefault();
                        html.submit();
                        alert(html);
                        }
        });
        }
            return false;
        }
