    call     .skip
    db       'hello world!',0
.skip:
    call     print_str
    add      rsp,8