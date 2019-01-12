
<?php if(isset($post)){
?>
<a href=<?=base_url()."index.php/akun/beranda";?>>Dasbor</a>
<?php
foreach ($post as $key=>$item):?>

<li><a href=<?=base_url()."index.php/post/blog/".$item['id'];?> ><?=$item['judul'];?></a></li>

<?php endforeach; }

else{
?>

<h2><?=$judul;?></h2>
<p>tanggal: <?=$tanggal;?></p>
<p>author: <?=$username;?></p>
<p><?=$konten;?></p>
<a href=<?=base_url()."index.php/post/blog"?>>back</a>

<?php }

?>