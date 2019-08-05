tsFiles=`find public src views -name "*.ts"`

tsCounter=0
for file in $tsFiles
do 
  tsCounter=$(($tsCounter + `cat $file | wc -l`))
done

pugFiles=`find public src views -name "*.pug"`

pugCounter=0
for file in $pugFiles
do 
  pugCounter=$(($pugCounter + `cat $file | wc -l`))
done

jsFiles=`find public src views -name "*.js"`

jsCounter=0
for file in $jsFiles
do 
  jsCounter=$(($jsCounter + `cat $file | wc -l`))
done

cssFiles=`find public src views -name "*.css"`

cssCounter=0
for file in $cssFiles
do 
  cssCounter=$(($cssCounter + `cat $file | wc -l`))
done

bashFiles=`find . -name "*.sh"`

bashCounter=0
for file in $bashFiles
do 
  bashCounter=$(($bashCounter + `cat $file | wc -l`))
done

echo "css:" $cssCounter lines
echo "js:"  $jsCounter lines
echo "pug:"  $pugCounter lines
echo "ts:"  $tsCounter lines
echo "bash:"  $bashCounter lines

echo "total:"  $(($pugCounter + $tsCounter + $cssCounter + $jsCounter + $bashCounter)) lines 