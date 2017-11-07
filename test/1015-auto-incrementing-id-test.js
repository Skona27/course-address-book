// this test assumes that createFunction.js "module" is included
QUnit.test( "Test that contacts are created and added to the list.", function( assert ) {
    assert.ok(contactList.length === 1, "Initially there is only one sample contact on the list." );

    contactList.push(createContact(uniqueID, 'testname', 'testsurname', '123', 'test@test.com'))
    assert.ok(contactList.length === 2, "Newly created contacted is appended to the list." );

    QUnit.test( "Test that contacts are assigned with unique, incrementing ID.", function( assert ) {
        assert.ok(contactList[0].id === 1, "Unique IDs start from 1." );
        assert.ok(contactList[1].id === 2, "The next contact has got ID of 2 assigned to it." );
    });
});

