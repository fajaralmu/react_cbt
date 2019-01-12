<b name="info"></b>
<form id="registrasi" action="daftar/proses" method="POST" enctype="multipart/form-data">
	<p>Username</p>
	<input type="text" id="username" name="username" onkeyup="cek_username();" required="required"/><b name="info"></b>
	<p>Password</p>
	<input type="text" id="password1" name="password1" required="required"/>
	<p>Ulangi Password</p>
	<input type="text" id="password" onkeyup="cek_password();" name="password" required="required"/><b name="info"></b>
	<p>Nama depan</p>
	<input type="text" id="nama_depan" name="nama_depan" required="required"/>
	<p>Nama belakang</p>
	<input type="text" id="nama_belakang" name="nama_belakang" required="required"/>
	<p>Foto profil</p>
	<input type="file" id="file" name="file"/>
	<button id="reset" onclick="document.getElementById('file').value=''; return false;">reset</button>
	<br/>
	<p><input type="submit" value="Daftar" onclick="validasi_form(); return false;"/></p>
</form>

<script type="text/javascript">
var username_tersedia = false;
var password_sesuai = false;
var nama_depan = document.getElementById('nama_depan').value;
var nama_belakang = document.getElementById('nama_belakang').value;
function cek_password(){
	var info = document.getElementsByName('info')[2];
	var p1 = document.getElementById('password1').value;
	var p = document.getElementById('password').value;
	if(p == p1){
		info.innerHTML = "Password sesuai";
		password_sesuai = true;
	}else{
		info.innerHTML = "Password tidak sesuai";
		password_sesuai = false;
	}
}

function validasi_form(){
	var info = document.getElementsByName('info')[0];
	var form = document.getElementById('registrasi');
	if(username_tersedia && password_sesuai){
		info.innerHTML = "OKE";
		form.submit();
	}else{
		info.innerHTML = "Data belum sesuai";
		return;
	}
}

function cek_username(){
	var input = document.getElementById('username').value;
	var info = document.getElementsByName('info')[1];
	info.innerHTML = "mengecek...";
	
	if(input == ""){
		info.innerHTML = "Tidak boleh kosong";
		return;
	}
	
	//info.innerHTML = input;
	var request = new XMLHttpRequest();
	var param = "username="+input;
    request.open("POST","username_tersedia", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function(){
        if(this.readyState == this.DONE && this.status == 200){
			if(this.responseText != null){
				if(this.responseText == true){
					info.style.color = "green";
					info.innerHTML = "username tersedia";
					username_tersedia = true;
				}else if(this.responseText == false){
					info.style.color = "red";
					info.innerHTML = "username tidak tersedia";
					username_tersedia = false;
				}
			}
		}
	}
	request.send(param);
}

</script>