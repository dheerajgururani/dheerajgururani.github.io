counter=0
echo "" >> $1.icl

while read line
do
    
    echo -n "${line%%// *}" >> $1.icl;
    actual=$(clmcompile $1 | tail -n 1);
    # echo "$actual"
    expected="${line#*//}"
    if [[ $expected =~ \"([^\"]*)\" ]]; then
        expected="\"${BASH_REMATCH[1]}\""
    else
        expected=$(echo $expected | tr -d '[:space:]')
        expected="\"$expected\""
        actual=$(echo $actual | tr -d '[:space:]')
        actual="\"$actual\""
        # echo "$expected"
        # echo "$actual"
    fi

    if [[ "$actual" == "$expected" ]]; then
        counter=$((counter+1))
        echo "Test passed" >> out.txt
    else
        echo "Test failed" >> out.txt
    fi

    sed -i '$ d' "$1.icl"
done < $2

# // if counter is 1 , then return 50 , if counter is 2 , then return 75 , if counter is 3 , then return 100
if [[ $counter == 1 ]]; then
    echo "50"
elif [[ $counter == 2 ]]; then
    echo "75"
elif [[ $counter == 3 ]]; then
    echo "$1" "100"
fi

echo $1 >> $1.txt